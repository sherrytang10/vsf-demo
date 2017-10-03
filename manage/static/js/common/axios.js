import axios from 'axios';


export default {
    //核心部分，在我们使用Vue.use()时，自动调用的是install
    install(Vue, Message){
        // 返回值统一拦截
        axios.interceptors.response.use(
            response => {
                let res = response.data;
                console.log(response)
                if(response.status===200 || response.status===201 || response.status === 304) {
                    if(res.status != 1) {
                        Message.alert(res.errmsg, '系统异常', {
                            confirmButtonText: '确定'
                        });
                        // return new Promise( () => {});
                        return Promise.reject(res);
                    } else {
                        return res;
                    }
                } else {
                    Message.alert(res.errmsg, `系统异常${res.status}`, {
                            confirmButtonText: '确定'
                        });
                }
            },
            ({response:{status, statusText, data}}) => {
                return Promise.reject({
                    status,
                    statusText,
                    data
                })   // 返回接口返回的错误信息
        });
　　　　Vue.prototype.$ = axios
    }
}

// exports.instal = Vue => Vue.prototype.$ = axios
/*
let axiosIns = (falert) => {

    // 创建子类，避免配置污染全局
    let axiosIns = axios.create({});

    // 设定子类的配置信息
    axiosIns.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest'

    // 子类的拦截器，对结果是否正常做出判断
    axiosIns.interceptors.response.use(function(response){
        let data = response.data;
        let status = response.status;
        if(status===200 || status === 304){
            let rstno = data.rstno;
            if(rstno>0){
                return data;
            }
            return Promise.reject(response);
        }else{
            if(status===412){
                instance.$store.commit('doLogout')
                instance.$router.push({
                    path:'/login',
                    query:{'redirect':instance.$route.fullPath},
                })
            }
            return Promise.reject(response);
        }
    })
    let ajaxMethod = ['get','post'];
    let api = {};
    ajaxMethod.forEach((method)=>{
        api[method] = function(uri,data,config){
            // 对axios包装的一层
            return new Promise(function(resolve,reject){
                axiosIns[method](uri,data,config).then((json)=>{
                    // 结果正常，业务逻辑层只需处理后端返回的json
                    resolve(json);
                }).catch((response)=>{
                    // 拦截器里reject都会走到这里
                    console.log(response);
                    if(response.status===200 && response.data.rstno<0){
                        instance.$message(response.data.data.err.msg);
                    }
                })
            })
        }
    })
}*/