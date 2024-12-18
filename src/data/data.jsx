import React from 'react';

export const links = [
    {
        id: 1,
        url: '/about',
        text: '关于我们',
        submenu: [
            {
                id: 1,
                url: '/about#company-intro',
                text: '公司简介',
            },
            {
                id: 2,
                url: '/about#company-culture',
                text: '企业文化',
            },
            {
                id: 3,
                url: '/about#company-honor',
                text: '荣誉资质',
            },
            {
                id: 4,
                url: '/about#company-history',
                text: '发展历程',
            },
        ],
        components: [
            {
                id: 1,
                custom_name: 'img_box',
                name: 'ImgBox',
                description: 'A box with an image and a title',
                props: {
                    type: 'A',
                    img: null,
                    title: 'Title',
                    detail: 'Detail',
                    link: null,
                    hashtag: null,
                },
            },
            {
                id: 2,
                custom_name: 'img_box',
                name: 'ImgBox',
                description: 'A box with an image and a title',
                props: {
                    type: 'A',
                    img: null,
                    title: 'Title',
                    detail: 'Detail',
                    link: null,
                    hashtag: null,
                },
            },
            {
                id:3,
                custom_name: 'img_box',
                name: 'ImgBox',
                description: 'A box with an image and a title',
                props: {
                    type: 'A',
                    img: null,
                    title: 'Title',
                    detail: 'Detail',
                    link: null,
                    hashtag: null,
                },
            },
            {
                id: 4,
                custom_name: 'img_box',
                name: 'ImgBox',
                description: 'A box with an image and a title',
                props: {
                    type: 'A',
                    img: null,
                    title: 'Title',
                    detail: 'Detail',
                    link: null,
                    hashtag: null,
                },
            }
        ]
    },
    {
        id: 2,
        url: '/product',
        text: '产品展示',
    },
    {
        id:3,
        url: '/origin',
        text:'生产地',
        components: [
            {
                id: 1,
                custom_name: 'parallax-view-item',
                name: 'parallaxItem',
                description: 'Image and text parallax view',
                props: {
                    img: null,
                    title: 'Title',
                    detailTitle: 'Detail Title',
                    detail: 'Detail',
                    link: null,
                },
            },
        ]
    },
    {
        id:4,
        url:'/news',
        text:'新闻动态',
        components: [
            {
                id: 1,
                custom_name: 'news',
                name: 'News',
                description: 'A news component',
                props: {
                    title: 'Title',
                    date: 'Date',
                    short:' This is a short description',
                    content: null,
                },
            },
        ]
    },
    {
        id:5,
        url:'/service',
        text:'我们的服务',
        submenu: [
            {
                id: 1,
                url: '/service#service-item',
                text: '服务项目',
            },
            {
                id: 2,
                url: '/service#service-process',
                text: '服务流程',
            },
            {
                id: 3,
                url: '/service#service-advantage',
                text: '服务优势',
            },
        ]
    },
    {
        id: 6,
        url: '/contact',
        text: '联系我们',
        submenu: [
            {
                id: 1,
                url: '/contact',
                text: '联系方式',
            },
            {
                id: 2,
                url: '/contact',
                text: '在线留言',
            },
        ]
    },
]