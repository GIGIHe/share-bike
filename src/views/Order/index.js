import React, { Component } from "react";
import { Card, Select, Form, DatePicker, Button, Table, Message, Modal } from "antd";
// 引入封装的axios
import axios from "../../Axios";
// 引入样式
import "./index.less";

// 选择菜单
const Option = Select.Option;
// form
const FormItem = Form.Item;
//日期
const { RangePicker } = DatePicker;

class Order extends Component {
  state = {
    //  DataSource，订单列表数据
    orderData: [],
    total: "",
    size: "",
    pn: 1,
    visible: false,
    selectedItem: "", //每行用户订单信息
    selectedIndex: "", //数据ID
    endMsg: "",
    loading: {
      spinning: true,
      tip: '数据正在拼命加载中',
      size: 'large'
    },
  };
  false;
  // 获取订单信息列表
  getOrder = () => {
    // this.setState({
    //   loading: {
    //     ...this.state.loading,
    //     spinning: true,
    //   }
    // });
    axios
      .get("/order/list", this.state.pn)
      .then(res => {
        if (res.code == 0) {
          this.setState({
            loading: {
              ...this.state.loading,
              spinning: false,
            },
            total: res.result.total_count,
            size: res.result.page_size,
            orderData: res.result.item_list.map((item, index) => {
              item.key = index;
              return item;
            })
          });
        }
        // console.log(this.state.orderData);
      })
      .catch(err => {
        Message.info(err);
      });
  };
  //查询
  handleSertch = () => {
    console.log(this.props.form.getFieldsValue());
  };
  //重置
  handReset = () => {
    this.props.form.resetFields();
  };
  //结束订单
  handleEnd = () => {
    if (this.state.selectedItem) {
      console.log(this.state.selectedItem);
      console.log(this.state.selectedIndex);
      //获取用户订单信息
      let id = this.state.selectedItem[0].id;
      axios.get("/order/ebike_info", id).then(res => {
        this.setState({
          endMsg: res.result
        });
      });
      this.setState({ visible: true });
    } else {
      Message.info("请选择一条数据");
    }
  };
  //取消
  handleCancel = () => {
    this.setState({
      visible: false
    });
    Message.info("已取消操作");
  };
  //确定删除
  handleOK = () => {
    let id = this.state.selectedItem[0].id;
    axios
      .get("/order/finish_order", id)
      .then(res => {
        if (res.code == 0) {
          Message.success(res.result);
          this.setState({
            visible: false
          });
          this.getOrder();
        }
      })
      .catch(err => Message.info(err));
  };
  //查看详情,定义成表达式和函数声明是不一样
  handleDetail=()=>{
    // console.log(this.state.selectedIndex);
    if (this.state.selectedItem){
      let id = this.state.selectedItem[0].id;
      console.log(id)
      window.open(`/#/order/${id}`, "_blank");
    }else{
       Message.info('请选择一条数据')
    }
  }
  // 生命周期函数
  componentWillMount = () => {
    this.getOrder();
  };
  render() {
    // 城市列表数据
    const cityData = [
      { value: 0, label: "北京" },
      { value: 1, label: "广州" },
      { value: 2, label: "上海" },
      { value: 3, label: "郑州" }
    ];
    // 订单状态信息
    const orderStatus = [
      { value: 0, status: "全部" },
      { value: 1, status: "正在进行" },
      { value: 2, status: "结束" }
    ];
    // table列，信息
    const columns = [
      { title: "订单编号", dataIndex: "order_sn", key: "order_sn" },
      { title: "车辆编号", dataIndex: "bike_sn", key: "bike_sn" },
      { title: "用户名", dataIndex: "user_name", key: "user_name" },
      { title: "手机号", dataIndex: "mobile", key: "mobile" },
      { title: "里程", dataIndex: "distance", key: "distance" },
      { title: "行驶时长", dataIndex: "total_time", key: "total_time" },
      { title: "状态", dataIndex: "status", key: "status" },
      { title: "开始时间", dataIndex: "start_time", key: "start_time" },
      { title: "结束时间", dataIndex: "end_time", key: "end_time" },
      { title: "订单金额", dataIndex: "total_fee", key: "total_fee" },
      { title: "实付金额", dataIndex: "user_pay", key: "user_pay" }
    ];
    // 表单元素的双向数据绑定
    const { getFieldDecorator } = this.props.form;
    //分页器
    const pagination = {
      total: this.state.total,
      size: this.state.size,
      onChange: index => {
        this.setState({
          pn: index
        });
        this.getOrder();
      }
    };
    //操作每行的table数据
    const rowSelection = {
      type: "radio",
      onChange: (selectedRowKeys, selectedRows) => {
        //selectedRowKeys--行的index，selectedRows--行的订单信息
        // console.log('1:',selectedRowKeys, '2:',selectedRows);
        this.setState({
          selectedItem: selectedRows,
          selectedIndex: selectedRowKeys
        });
      }
    };
    return (
      <div>
        <Form layout="inline">
          <Card>
            <FormItem label="城市">
              {getFieldDecorator("city")(
                <Select
                  showSearch
                  style={{ width: 200 }}
                  placeholder="请选择一个城市"
                  on
                >
                  {cityData.map((item, index) => (
                    <Option value={item.value} key={index}>
                      {item.label}
                    </Option>
                  ))}
                </Select>
              )}
            </FormItem>
            <FormItem label="订单时间">
              {getFieldDecorator("date")(<RangePicker />)}
            </FormItem>
            <FormItem label="订单状态">
              {getFieldDecorator("status")(
                <Select showSearch style={{ width: 200 }}>
                  {orderStatus.map((item, index) => (
                    <Option value={item.value} key={index}>
                      {item.status}
                    </Option>
                  ))}
                </Select>
              )}
            </FormItem>
            <div className="btn-wrap">
              <Button
                type="primary"
                className="find"
                onClick={this.handleSertch}
              >
                查询
              </Button>
              <Button onClick={this.handReset}>重置</Button>
            </div>
          </Card>
          <Card>
            <div className="btn-wrap">
              <Button
                type="primary"
                className="find"
                onClick={this.handleDetail}
              >
                订单详情
              </Button>
              <Button onClick={this.handleEnd}>结束订单</Button>
              <Modal
                title="结束订单"
                visible={this.state.visible}
                okText="确定"
                cancelText="取消"
                onOk={this.handleOK}
                onCancel={this.handleCancel}
              >
                <ul className="order-msg">
                  <li>车辆编号: {this.state.endMsg.bike_sn}</li>
                  <li>
                    剩余电量：
                    {this.state.endMsg.battery}
                  </li>
                  <li>
                    行程开始时间：
                    {this.state.endMsg.start_time}
                  </li>
                  <li>
                    当前位置：
                    {this.state.endMsg.location}
                  </li>
                </ul>
              </Modal>
            </div>
          </Card>
        </Form>
        <Card>
          <Table
            dataSource={this.state.orderData}
            columns={columns}
            pagination={pagination}
            loading={this.state.loading}
            rowSelection={rowSelection}
          />
        </Card>
      </div>
    );
  }
}
export default Form.create()(Order);
