import React from 'react';
import {Redirect} from 'react-router-dom';
import Home from '../application/Home';
import Recommend from '../application/Recommend';
import Singers from '../application/Singers';
import Rank from '../application/Rank';
import Singer from '../application/Singer';
import Album from '../application/Album';
import Search from '../application/Search';

export default [
    {
        path: '/',
        component: Home,
        routes: [
            {
                path: '/',
                exact: true,
                render: () => (
                    <Redirect to={'/recommend'} />
                )
            },
            {
                path: '/recommend',
                component: Recommend,
                routes: [
                    {
                        path: '/recommend/:id',
                        component: Album
                    }
                ]
            },
            {
                 path: '/singers',
                 component: Singers,
                 key: 'singers',
                 routes: [
                    {
                        path: '/singers/:id',
                        component: Singer
                    }
                 ]
            },
            {
                path: '/rank',
                component: Rank,
                routes: [
                    {
                        path: '/rank/:id',
                        component: Album
                    }
                ]
            },
            {
                path: '/search',
                exact: true,
                key: 'search',
                component: Search
            },
            {
                path: "/album/:id",
                exact: true,
                key: "album",
                component: Album
            }
        ]
    }
];

/*
真是学到了，从上面的路由配置来说，路由对应的页面，说到底也就是个组件，是组件就可以重复利用，可以
被利用在路由、子路由，或者另外一个页面的路由，参数控制通过动态路由来传递
*/