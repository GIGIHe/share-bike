    import * as fetch from 'axios'

export function formatDate(unix){
        function fix(num) {
           return num>9?(num):('0'+num)
        }
        let date = new Date(unix);
        let year = date.getFullYear();
        let month = date.getMonth()+1;
        let day = fix(date.getDate());
        let hour = fix(date.getHours());
        let min = fix(date.getMinutes());
        let sec = fix(date.getSeconds());
        let timeStr = `${year}-${month}-${day} ${hour}:${min}:${sec}`;
        return timeStr;
    };


    const instance = fetch.create({
        baseURL:'',
        timeout:1500
    })
    export const axios = {
        get(url,data,config){
        return new Promise((resolve,reject)=>{
            instance.get(url,{params:data},config).then(res=>{
            resolve(res.data)
            }).catch(err=>{
               reject(err)
        })
        })
    }
}
