import type { Post } from "@prisma/client"
import { markdownEx, markdownEx2 } from "./markdownEx"

const postEx: (Post & GeneralUserInfo)[] = [
    {
        id: '64a4597e5fb1d94464038165',
        userId: '649dd3d21a4f3c363800f786',
        title: 'HELLO WORLD',
        body: markdownEx,
        createdAt: new Date(),
        updatedAt: new Date(),
        image: null,
        stars: 1,
        user: {
            image: "https://rukminim1.flixcart.com/image/850/1000/kufuikw0/poster/j/d/x/small-aesthetic-anime-girl-wall-poster-size-12x18-asstore-red-original-imag7k2v5dbs8tgn.jpeg?q=90",
            username: "eve",
            name: 'eve'
        }
    },
    {
        id: '64a459885fb1d94464038166',
        userId: '649dd3d21a4f3c363800f786',
        title: 'SUP WORLD',
        body: `

        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas placerat vitae nulla eu gravida. Suspendisse laoreet porttitor est vitae scelerisque. Mauris suscipit diam vel faucibus gravida. Donec leo nibh, imperdiet vel feugiat vitae, iaculis vel massa. Praesent hendrerit porttitor erat blandit accumsan. Proin augue augue, pharetra in tempus at, varius ac nisl. Mauris at molestie purus, varius pharetra justo. Mauris aliquam, diam consequat auctor hendrerit, ipsum nisl consectetur ex, a porta risus nibh a ligula. In ac blandit augue.
        
        Fusce a dignissim risus. Quisque ac ultricies mi, id vulputate tortor. Morbi imperdiet quam quis lorem varius blandit. In luctus, leo consequat tempor consequat, erat nisl suscipit diam, sit amet ullamcorper dolor justo sed nisl. Interdum et malesuada fames ac ante ipsum primis in faucibus. Integer fringilla ullamcorper urna. Pellentesque sit amet metus urna. Nunc at rhoncus mauris. Ut ornare tempor ante, vitae blandit neque semper ac. Donec vestibulum molestie neque, id tincidunt tortor eleifend quis. Donec sollicitudin lobortis diam, sit amet scelerisque nisi porttitor congue. Nulla et commodo tellus. `,
        createdAt: new Date(),
        updatedAt: new Date(),
        image: null,
        stars: 1,
        user: {
            image: null,
            username: "eve",
            name: 'eve'
        }
    },
    {
        id: '64a4598b5fb1d94464038167',
        userId: '649dd3d21a4f3c363800f786',
        title: 'GOODBYE WORLD',
        body: markdownEx2,
        createdAt: new Date(),
        updatedAt: new Date("1/10/2023"),
        image: null,
        stars: 1,
        user: {
            image: null,
            username: "eve",
            name: 'eve'
        }
    },
    {
        id: '64a459935fb1d94464038169',
        userId: '649dd3d21a4f3c363800f786',
        title: 'SAYONARA WORLD',
        body: `

        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas placerat vitae nulla eu gravida. Suspendisse laoreet porttitor est vitae scelerisque. Mauris suscipit diam vel faucibus gravida. Donec leo nibh, imperdiet vel feugiat vitae, iaculis vel massa. Praesent hendrerit porttitor erat blandit accumsan. Proin augue augue, pharetra in tempus at, varius ac nisl. Mauris at molestie purus, varius pharetra justo. Mauris aliquam, diam consequat auctor hendrerit, ipsum nisl consectetur ex, a porta risus nibh a ligula. In ac blandit augue.
        
        Fusce a dignissim risus. Quisque ac ultricies mi, id vulputate tortor. Morbi imperdiet quam quis lorem varius blandit. In luctus, leo consequat tempor consequat, erat nisl suscipit diam, sit amet ullamcorper dolor justo sed nisl. Interdum et malesuada fames ac ante ipsum primis in faucibus. Integer fringilla ullamcorper urna. Pellentesque sit amet metus urna. Nunc at rhoncus mauris. Ut ornare tempor ante, vitae blandit neque semper ac. Donec vestibulum molestie neque, id tincidunt tortor eleifend quis. Donec sollicitudin lobortis diam, sit amet scelerisque nisi porttitor congue. Nulla et commodo tellus. `,
        createdAt: new Date(),
        updatedAt: new Date(),
        image: null,
        stars: 1,
        user: {
            image: null,
            username: "eve",
            name: 'eve'
        }
    },
]

export default postEx