import type { Post } from "@prisma/client"

const postEx: Post[] = [
    {
        id: '123123',
        userId: '123',
        title: 'HELLO WORLD',
        body: `

        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas placerat vitae nulla eu gravida. Suspendisse laoreet porttitor est vitae scelerisque. Mauris suscipit diam vel faucibus gravida. Donec leo nibh, imperdiet vel feugiat vitae, iaculis vel massa. Praesent hendrerit porttitor erat blandit accumsan. Proin augue augue, pharetra in tempus at, varius ac nisl. Mauris at molestie purus, varius pharetra justo. Mauris aliquam, diam consequat auctor hendrerit, ipsum nisl consectetur ex, a porta risus nibh a ligula. In ac blandit augue.
        
        Fusce a dignissim risus. Quisque ac ultricies mi, id vulputate tortor. Morbi imperdiet quam quis lorem varius blandit. In luctus, leo consequat tempor consequat, erat nisl suscipit diam, sit amet ullamcorper dolor justo sed nisl. Interdum et malesuada fames ac ante ipsum primis in faucibus. Integer fringilla ullamcorper urna. Pellentesque sit amet metus urna. Nunc at rhoncus mauris. Ut ornare tempor ante, vitae blandit neque semper ac. Donec vestibulum molestie neque, id tincidunt tortor eleifend quis. Donec sollicitudin lobortis diam, sit amet scelerisque nisi porttitor congue. Nulla et commodo tellus. `,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: "eve"
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
        createdBy: "eve"
    },
    {
        id: '123345',
        userId: '123',
        title: 'GOODBYE WORLD',
        body: `

        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis fringilla odio faucibus, rhoncus nisl lobortis, viverra nibh. Maecenas a sapien est. Nam iaculis, augue nec sollicitudin placerat, felis nisi ullamcorper lorem, a venenatis risus purus sed enim. Nulla facilisi. Integer tristique posuere sapien, id facilisis nibh auctor nec. Aliquam bibendum, purus vitae congue lacinia, dui sem convallis arcu, ut bibendum arcu tellus at purus. Praesent sodales nibh in odio tempus mollis. Nunc non magna lobortis, euismod elit eu, convallis ex. Sed sit amet lectus vel neque ornare ornare malesuada id est. Nulla dignissim neque nec nisi congue maximus. Suspendisse iaculis, sapien et convallis sodales, turpis tortor fringilla risus, id hendrerit purus odio sed erat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;
        
        Quisque interdum dictum justo, id sagittis ante iaculis sit amet. Ut dui sapien, consequat consectetur fringilla a, vehicula molestie lectus. Curabitur efficitur accumsan fermentum. Donec aliquam commodo augue, at dictum leo ullamcorper at. Suspendisse rhoncus tortor eleifend diam gravida, a consequat lectus finibus. Etiam nec nulla tristique, blandit ligula id, mattis urna. Sed et congue quam. Quisque sapien neque, dictum id elementum quis, cursus vitae tellus. Donec in feugiat lectus. Ut vestibulum porttitor arcu at elementum. Aenean dapibus accumsan cursus. Vestibulum lacinia tempor ultricies. Donec eleifend pharetra magna. Fusce varius pharetra ipsum, ut scelerisque erat ornare vel. `,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: "eve"
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
        createdBy: "eve"
    },
]

export default postEx