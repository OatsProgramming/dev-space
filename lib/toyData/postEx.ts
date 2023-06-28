import type { Post } from "@prisma/client"
import { markdownEx, markdownEx2 } from "./markdownEx"

const postEx: Post[] = [
    {
        id: '123123',
        userId: '123',
        title: 'HELLO WORLD',
        body: markdownEx,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: "eve",
        image: null,
    },
    {
        id: '123234',
        userId: '123',
        title: 'SUP WORLD',
        body: `

        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas placerat vitae nulla eu gravida. Suspendisse laoreet porttitor est vitae scelerisque. Mauris suscipit diam vel faucibus gravida. Donec leo nibh, imperdiet vel feugiat vitae, iaculis vel massa. Praesent hendrerit porttitor erat blandit accumsan. Proin augue augue, pharetra in tempus at, varius ac nisl. Mauris at molestie purus, varius pharetra justo. Mauris aliquam, diam consequat auctor hendrerit, ipsum nisl consectetur ex, a porta risus nibh a ligula. In ac blandit augue.
        
        Fusce a dignissim risus. Quisque ac ultricies mi, id vulputate tortor. Morbi imperdiet quam quis lorem varius blandit. In luctus, leo consequat tempor consequat, erat nisl suscipit diam, sit amet ullamcorper dolor justo sed nisl. Interdum et malesuada fames ac ante ipsum primis in faucibus. Integer fringilla ullamcorper urna. Pellentesque sit amet metus urna. Nunc at rhoncus mauris. Ut ornare tempor ante, vitae blandit neque semper ac. Donec vestibulum molestie neque, id tincidunt tortor eleifend quis. Donec sollicitudin lobortis diam, sit amet scelerisque nisi porttitor congue. Nulla et commodo tellus. `,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: "eve",
        image: null,
    },
    {
        id: '123345',
        userId: '123',
        title: 'GOODBYE WORLD',
        body: markdownEx2,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: "eve",
        image: null,
    },
    {
        id: '234123',
        userId: '123',
        title: 'SAYONARA WORLD',
        body: `

        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas placerat vitae nulla eu gravida. Suspendisse laoreet porttitor est vitae scelerisque. Mauris suscipit diam vel faucibus gravida. Donec leo nibh, imperdiet vel feugiat vitae, iaculis vel massa. Praesent hendrerit porttitor erat blandit accumsan. Proin augue augue, pharetra in tempus at, varius ac nisl. Mauris at molestie purus, varius pharetra justo. Mauris aliquam, diam consequat auctor hendrerit, ipsum nisl consectetur ex, a porta risus nibh a ligula. In ac blandit augue.
        
        Fusce a dignissim risus. Quisque ac ultricies mi, id vulputate tortor. Morbi imperdiet quam quis lorem varius blandit. In luctus, leo consequat tempor consequat, erat nisl suscipit diam, sit amet ullamcorper dolor justo sed nisl. Interdum et malesuada fames ac ante ipsum primis in faucibus. Integer fringilla ullamcorper urna. Pellentesque sit amet metus urna. Nunc at rhoncus mauris. Ut ornare tempor ante, vitae blandit neque semper ac. Donec vestibulum molestie neque, id tincidunt tortor eleifend quis. Donec sollicitudin lobortis diam, sit amet scelerisque nisi porttitor congue. Nulla et commodo tellus. `,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: "eve",
        image: null,
    },
]

export default postEx