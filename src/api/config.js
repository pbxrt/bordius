import axios from 'axios';

export const baseUrl = 'http://localhost:3031';

const axiosInstance = axios.create({
    baseURL: baseUrl
});

axiosInstance.interceptors.response.use(
    res => res.data,
    err => {
        console.log(err, '网络错误')
    }
);

export {
    axiosInstance
};

export const categoryTypes = [
    {
        name: '话语男',
        key: '1001'
    },
    {
      name: "华语女",
      key: "1002"
    },
    {
      name: "华语组合",
      key: "1003"
    },
    {
      name: "欧美男",
      key: "2001"
    },
    {
      name: "欧美女",
      key: "2002"
    },
    {
      name: "欧美组合",
      key: "2003"
    },
    {
      name: "日本男",
      key: "6001"
    },
    {
      name: "日本女",
      key: "6002"
    },
    {
      name: "日本组合",
      key: "6003"
    },
    {
      name: "韩国男",
      key: "7001"
    },
    {
      name: "韩国女",
      key: "7002"
    },
    {
      name: "韩国组合",
      key: "7003"
    },
    {
      name: "其他男歌手",
      key: "4001"
    },
    {
      name: "其他女歌手",
      key: "4002"
    },
    {
      name: "其他组合",
      key: "4003"
    }
];

// 歌手首字母
export const alphaTypes = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    .split('')
    .map(alpha => ({
        key: alpha,
        name: alpha
    }));
