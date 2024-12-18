export const AllComponents = [
    {
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
        name:"TextBlock"
    },
    {
        name: 'News',
        description: 'A news component',
        props: {
            title: 'Title',
            date: 'Date',
            short:' This is a short description',
            content: null,
        },
    },
    {
        name: 'parallaxItem',
        description: 'Image and text parallax view',
        props: {
            img: null,
            title: 'Title',
            detailTitle: 'Detail Title',
            detail: 'Detail',
            link: null,
        },
    }
];
