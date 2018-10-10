import React,{  Component} from "react";
import { Link } from "react-router-dom";
import './not.less'
export default class Not extends Component{
    render(){
        return(
            <div className="not-wrap">
            <div className=" clearfix">
                <div className="img-box fr">
                < img src = "http://img.soogif.com/UOK30r5kAjS9w0M9Lt5bo8NdMMBe7XtN.gif" alt="点我啊"/ >
                </div>
                <div className="fl detail"><p>页面丢了哦....</p> 
                <ul>
                    <li><Link to="/admin/home" replace>回首页</Link></li>
                </ul>
                </div>
            </div>
            </div>
        
        )
     
    }
}