import React, { lazy, Suspense } from 'react';
import {Redirect} from 'react-router-dom';
import Home from '../application/Home';

const RecommendComponent = lazy(() => import('../application/Recommend'));
const SingersComponent = lazy(() => import('../application/Singers'));
const RankComponent = lazy(() => import('../application/Rank'));
const SingerComponent = lazy(() => import('../application/Singer'));
const AlbumComponent = lazy(() => import('../application/Album'));
const SearchComponent = lazy(() => import('../application/Search'));


// props 是 React 传下去的，包括 history 等 props
const SuspenseComponent = Component => props => {
    return (
        <Suspense fallback={null}>
            <Component {...props} />
        </Suspense>
    )
}

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
                component: SuspenseComponent(RecommendComponent),
                routes: [
                    {
                        path: '/recommend/:id',
                        component: SuspenseComponent(AlbumComponent)
                    }
                ]
            },
            {
                 path: '/singers',
                 component: SuspenseComponent(SingersComponent),
                 key: 'singers',
                 routes: [
                    {
                        path: '/singers/:id',
                        component: SuspenseComponent(SingerComponent),
                    }
                 ]
            },
            {
                path: '/rank',
                component: SuspenseComponent(RankComponent),
                routes: [
                    {
                        path: '/rank/:id',
                        component: SuspenseComponent(AlbumComponent)
                    }
                ]
            },
            {
                path: '/search',
                exact: true,
                key: 'search',
                component: SuspenseComponent(SearchComponent)
            },
            {
                path: "/album/:id",
                exact: true,
                key: "album",
                component: SuspenseComponent(AlbumComponent)
            }
        ]
    }
];

/*
真是学到了，从上面的路由配置来说，路由对应的页面，说到底也就是个组件，是组件就可以重复利用，可以
被利用在路由、子路由，或者另外一个页面的路由，参数控制通过动态路由来传递
*/