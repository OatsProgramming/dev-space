const markdownEx =   
'# Summary\n' +
"![img](https://img.freepik.com/free-vector/editable-floral-aesthetic-template-social-media-post-with-inspirational-quote_53876-119317.jpg)" +
    '\n' +
    'I\'m creating a CRUD application to play around with the new app directory and I\'ve encountered a problem when upgrading to Next JS 13.3.0: \n' +
    '\n' +
    'For some reason, "DELETE" does not work in the api endpoints. Prior to 13.3, I was working with 13.2.4 and I\'ve never encountered that issue. \n' +
    '\n' +
    'I do apologize in advance if my explanation of the issue is a bit hard to understand ( I am a bit of a novice fullstack dev ), but I will try my best.\n' +
    '\n' +
    'Here\'s my code: \n' +
    '\n' +
    'DELETE fn\n' +
    '```typescript\n' +
    'export async function DELETE(request: Request) {\n' +
    '    const post = await ValidateRequest(request, \'DELETE\')\n' +
    '    if (post instanceof Error) return failedResponse(post, badRequest)\n' +
    '    try {\n' +
    '        // Identify the specific post\n' +
    '        const postDoc = doc(db, \'posts\', post.id!)\n' +
    '\n' +
    '        await deleteDoc(postDoc)\n' +
    '    } catch (err) {\n' +
    '        // On network error\n' +
    '        const error = err as Error\n' +
    '        return failedResponse(error, fetchFail)\n' +
    '    }\n' +
    '    return new Response(JSON.stringify(post), responseSuccess)\n' +
    '}\n' +
    "![img](https://img.freepik.com/free-vector/editable-floral-aesthetic-template-social-media-post-with-inspirational-quote_53876-119317.jpg)" +
    '```\n' +
    '\n' +
    'Validation method for request body\n' +
    '```typescript\n' +
    'async function ValidateRequest(request: Request, HTTP: HTTP){\n' +
    '    let post: PostObj;\n' +
    '    try {\n' +
    '        console.log(request)\n' +
    '        post = await request.json()\n' +
    '        console.log(post)\n' +
    '        switch (HTTP){\n' +
    '            // Check if its missing any required properties (for each method)\n' +
    '            .....\n' +
    '            case \'DELETE\' : {\n' +
    '                if (!post.id){\n' +
    '                    throw new Error(`\nInvalid \'post\' request body:\n' +
    '                        id?               ${post.id ? \'OK\' : \'MISSING\'}\n' +
    '                    `)\n' +
    '                }\n' +
    '                break;\n' +
    '            }\n' +
    '            .....\n' +
    '            default : {\n' +
    '                throw new Error(\'Unknown HTTP method\')\n' +
    '            }\n' +
    '        }\n' +
    '    } catch (err) {\n' +
    '        // Error if missing any properties\n' +
    '        console.log(err)\n' +
    '        return err as Error\n' +
    '    }\n' +
    '    // Will return if valid \n' +
    '    return post\n' +
    '}\n' +
    '```\n' +
    '\n' +
    'The fetcher fn\n' +
    '```typescript\n' +
    'export async function mutatePost(method: HTTP, content: {}): Promise<void> {\n' +
    '    if (method === \'GET\') return \n' +
    '    const res = await fetch(`${url}/api/posts`, {\n' +
    '        method: method,\n' +
    '        headers: {\n' +
    '            "Content-Type": "application/json"\n' +
    '        },\n' +
    '        body: JSON.stringify(content)\n' +
    '    })\n' +
    '    if (!res.ok) {\n' +
    '        console.log(await res.json())\n' +
    '    }\n' +
    '}\n' +
    '```\n' +
    '( Please note that the other DELETE fns are similar just different data )\n' +
    '\n' +
    'With that being said, for some reason it "works" with useSWR hook. The reason why i put quotes on "works" is bc it doesn\'t really call the DELETE method, but it still manages to do the job. I\'ve checked this by putting console.log() everywhere to find out what\'s going on, but this is for the first time i was so genuinely confused. \n' +
    '\n' +
    'That these errors ( or lack thereof if I\'m using useSWR ) occured after I\'ve upgraded from 13.2.4 to 13.3.0. \n' +
    '\n' +
    '( The error is usually just a Syntax Error for some reason: Error: Unexpected end of JSON input )\n' +
    '\n' +
    'After downgrading back to 13.2.4, all went back to normal. Does anyone else have this problem?\n' +
    '\n' +
    '### Additional information\n' +
    '\n' +
    '```\n' +
    'Just in case: \n' +
    '\n' +
    '\n' +
    '"dependencies": {\n' +
    '    "@next/bundle-analyzer": "^13.2.4",\n' +
    '    "@types/node": "18.15.0",\n' +
    '    "@types/react": "18.0.28",\n' +
    '    "@types/react-dom": "18.0.11",\n' +
    '    "encoding": "^0.1.13",\n' +
    '    "firebase": "^9.17.2",\n' +
    '    "framer-motion": "^10.10.0",\n' +
    '    "next": "^13.2.4",\n' +
    '    "popmotion": "^11.0.5",\n' +
    '    "react": "18.2.0",\n' +
    '    "react-dom": "18.2.0",\n' +
    '    "swr": "^2.1.1",\n' +
    '    "typescript": "4.9.5",\n' +
    '    "zustand": "^4.3.7"\n' +
    '  }\n' +
    '```\n' +
    '```\n' +
    '\n' +
    '\n' +
    '### Example\n' +
    '\n' +
    '_No response_'+ 
    `

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce imperdiet euismod pellentesque. Maecenas purus orci, bibendum vitae molestie ac, fermentum sit amet lacus. Proin in turpis feugiat, egestas turpis vel, imperdiet sapien. Praesent dapibus maximus erat, eget finibus lacus porta vel. Praesent felis nisi, ornare at est quis, ornare vulputate nulla. Curabitur nec dui ac ligula ultricies ornare. Quisque in risus tristique, sodales tellus et, tempus nibh. Suspendisse tortor risus, venenatis ullamcorper nulla sit amet, dictum tristique mi. Etiam quam nibh, efficitur quis dignissim id, lobortis at tellus. Integer vel neque eu mauris interdum posuere. Integer commodo enim eu diam auctor suscipit. Ut dictum cursus mi, quis fringilla metus laoreet nec. Donec quis augue placerat, porttitor orci eget, dapibus dui. Mauris eget porta purus.

Aliquam malesuada metus nunc, vestibulum molestie orci porttitor quis. Vivamus non luctus orci, in pellentesque nibh. Donec ut egestas enim. Vivamus vel tempus enim, cursus dictum lorem. Sed bibendum lobortis lobortis. Vivamus id tempor sapien. Etiam faucibus leo at volutpat feugiat.

Nullam vel mi tempus augue venenatis posuere eget vel est. Maecenas dictum, arcu sit amet tincidunt mollis, dolor mi aliquet risus, vitae euismod nisl nisl sit amet metus. Aenean at felis rhoncus, porttitor sem sed, suscipit erat. Nullam ipsum ligula, mollis quis enim id, varius blandit augue. Proin a ante mauris. Integer massa elit, hendrerit convallis tincidunt vitae, facilisis non diam. In a velit et ante lobortis mattis a ut odio. Donec sit amet lacus dui. Cras a ligula mauris. Aliquam a nisl mi. Aenean convallis gravida risus quis ultrices. Proin libero urna, mattis a tincidunt at, commodo id massa.

Quisque efficitur odio arcu. Ut dapibus hendrerit risus quis eleifend. Proin sit amet tincidunt nulla. Suspendisse eu massa molestie, finibus augue sodales, faucibus nunc. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In ac turpis vel arcu porttitor aliquet sit amet in dolor. Morbi mi orci, fermentum vitae molestie viverra, scelerisque at leo.

Nunc vel iaculis lorem. Ut venenatis malesuada nulla id pellentesque. Sed ante quam, mollis sed orci eget, bibendum lacinia ex. Integer tincidunt ex non mauris semper, at feugiat magna rutrum. Sed non orci sed neque lacinia sagittis nec nec enim. Aenean elementum imperdiet viverra. Fusce malesuada sit amet ex ac tincidunt. Etiam at dictum nibh. Sed tristique elit lorem, in fermentum turpis volutpat id. Nulla nec hendrerit turpis. `
const markdownEx2 = 
'# Summary\n' +
"![img](https://cdn.shopify.com/s/files/1/0576/6198/0872/articles/night-city-top-anime-with-a-90s-anime-aesthetic-retro.jpg?v=1653957333)" +
    '\n' +
    'I\'m creating a CRUD application to play around with the new app directory and I\'ve encountered a problem when upgrading to Next JS 13.3.0: \n' +
    '\n' +
    'For some reason, "DELETE" does not work in the api endpoints. Prior to 13.3, I was working with 13.2.4 and I\'ve never encountered that issue. \n' +
    '\n' +
    'I do apologize in advance if my explanation of the issue is a bit hard to understand ( I am a bit of a novice fullstack dev ), but I will try my best.\n' +
    '\n' +
    'Here\'s my code: \n' +
    '\n' +
    'DELETE fn\n' +
    '```typescript\n' +
    'export async function DELETE(request: Request) {\n' +
    '    const post = await ValidateRequest(request, \'DELETE\')\n' +
    '    if (post instanceof Error) return failedResponse(post, badRequest)\n' +
    '    try {\n' +
    '        // Identify the specific post\n' +
    '        const postDoc = doc(db, \'posts\', post.id!)\n' +
    '\n' +
    '        await deleteDoc(postDoc)\n' +
    '    } catch (err) {\n' +
    '        // On network error\n' +
    '        const error = err as Error\n' +
    '        return failedResponse(error, fetchFail)\n' +
    '    }\n' +
    '    return new Response(JSON.stringify(post), responseSuccess)\n' +
    '}\n' +
    "![img](https://img.freepik.com/free-vector/editable-floral-aesthetic-template-social-media-post-with-inspirational-quote_53876-119317.jpg)" +
    '```\n' +
    '\n' +
    'Validation method for request body\n' +
    '```typescript\n' +
    'async function ValidateRequest(request: Request, HTTP: HTTP){\n' +
    '    let post: PostObj;\n' +
    '    try {\n' +
    '        console.log(request)\n' +
    '        post = await request.json()\n' +
    '        console.log(post)\n' +
    '        switch (HTTP){\n' +
    '            // Check if its missing any required properties (for each method)\n' +
    '            .....\n' +
    '            case \'DELETE\' : {\n' +
    '                if (!post.id){\n' +
    '                    throw new Error(`\nInvalid \'post\' request body:\n' +
    '                        id?               ${post.id ? \'OK\' : \'MISSING\'}\n' +
    '                    `)\n' +
    '                }\n' +
    '                break;\n' +
    '            }\n' +
    '            .....\n' +
    '            default : {\n' +
    '                throw new Error(\'Unknown HTTP method\')\n' +
    '            }\n' +
    '        }\n' +
    '    } catch (err) {\n' +
    '        // Error if missing any properties\n' +
    '        console.log(err)\n' +
    '        return err as Error\n' +
    '    }\n' +
    '    // Will return if valid \n' +
    '    return post\n' +
    '}\n' +
    '```\n' +
    '\n' +
    'The fetcher fn\n' +
    '```typescript\n' +
    'export async function mutatePost(method: HTTP, content: {}): Promise<void> {\n' +
    '    if (method === \'GET\') return \n' +
    '    const res = await fetch(`${url}/api/posts`, {\n' +
    '        method: method,\n' +
    '        headers: {\n' +
    '            "Content-Type": "application/json"\n' +
    '        },\n' +
    '        body: JSON.stringify(content)\n' +
    '    })\n' +
    '    if (!res.ok) {\n' +
    '        console.log(await res.json())\n' +
    '    }\n' +
    '}\n' +
    '```\n' +
    '( Please note that the other DELETE fns are similar just different data )\n' +
    '\n' +
    'With that being said, for some reason it "works" with useSWR hook. The reason why i put quotes on "works" is bc it doesn\'t really call the DELETE method, but it still manages to do the job. I\'ve checked this by putting console.log() everywhere to find out what\'s going on, but this is for the first time i was so genuinely confused. \n' +
    '\n' +
    'That these errors ( or lack thereof if I\'m using useSWR ) occured after I\'ve upgraded from 13.2.4 to 13.3.0. \n' +
    '\n' +
    '( The error is usually just a Syntax Error for some reason: Error: Unexpected end of JSON input )\n' +
    '\n' +
    'After downgrading back to 13.2.4, all went back to normal. Does anyone else have this problem?\n' +
    '\n' +
    '### Additional information\n' +
    '\n' +
    '```\n' +
    'Just in case: \n' +
    '\n' +
    '\n' +
    '"dependencies": {\n' +
    '    "@next/bundle-analyzer": "^13.2.4",\n' +
    '    "@types/node": "18.15.0",\n' +
    '    "@types/react": "18.0.28",\n' +
    '    "@types/react-dom": "18.0.11",\n' +
    '    "encoding": "^0.1.13",\n' +
    '    "firebase": "^9.17.2",\n' +
    '    "framer-motion": "^10.10.0",\n' +
    '    "next": "^13.2.4",\n' +
    '    "popmotion": "^11.0.5",\n' +
    '    "react": "18.2.0",\n' +
    '    "react-dom": "18.2.0",\n' +
    '    "swr": "^2.1.1",\n' +
    '    "typescript": "4.9.5",\n' +
    '    "zustand": "^4.3.7"\n' +
    '  }\n' +
    '```\n' +
    '```\n' +
    '\n' +
    '\n' +
    '### Example\n' +
    '\n' +
    '_No response_'+ 
    `

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce imperdiet euismod pellentesque. Maecenas purus orci, bibendum vitae molestie ac, fermentum sit amet lacus. Proin in turpis feugiat, egestas turpis vel, imperdiet sapien. Praesent dapibus maximus erat, eget finibus lacus porta vel. Praesent felis nisi, ornare at est quis, ornare vulputate nulla. Curabitur nec dui ac ligula ultricies ornare. Quisque in risus tristique, sodales tellus et, tempus nibh. Suspendisse tortor risus, venenatis ullamcorper nulla sit amet, dictum tristique mi. Etiam quam nibh, efficitur quis dignissim id, lobortis at tellus. Integer vel neque eu mauris interdum posuere. Integer commodo enim eu diam auctor suscipit. Ut dictum cursus mi, quis fringilla metus laoreet nec. Donec quis augue placerat, porttitor orci eget, dapibus dui. Mauris eget porta purus.

Aliquam malesuada metus nunc, vestibulum molestie orci porttitor quis. Vivamus non luctus orci, in pellentesque nibh. Donec ut egestas enim. Vivamus vel tempus enim, cursus dictum lorem. Sed bibendum lobortis lobortis. Vivamus id tempor sapien. Etiam faucibus leo at volutpat feugiat.

Nullam vel mi tempus augue venenatis posuere eget vel est. Maecenas dictum, arcu sit amet tincidunt mollis, dolor mi aliquet risus, vitae euismod nisl nisl sit amet metus. Aenean at felis rhoncus, porttitor sem sed, suscipit erat. Nullam ipsum ligula, mollis quis enim id, varius blandit augue. Proin a ante mauris. Integer massa elit, hendrerit convallis tincidunt vitae, facilisis non diam. In a velit et ante lobortis mattis a ut odio. Donec sit amet lacus dui. Cras a ligula mauris. Aliquam a nisl mi. Aenean convallis gravida risus quis ultrices. Proin libero urna, mattis a tincidunt at, commodo id massa.

Quisque efficitur odio arcu. Ut dapibus hendrerit risus quis eleifend. Proin sit amet tincidunt nulla. Suspendisse eu massa molestie, finibus augue sodales, faucibus nunc. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In ac turpis vel arcu porttitor aliquet sit amet in dolor. Morbi mi orci, fermentum vitae molestie viverra, scelerisque at leo.

Nunc vel iaculis lorem. Ut venenatis malesuada nulla id pellentesque. Sed ante quam, mollis sed orci eget, bibendum lacinia ex. Integer tincidunt ex non mauris semper, at feugiat magna rutrum. Sed non orci sed neque lacinia sagittis nec nec enim. Aenean elementum imperdiet viverra. Fusce malesuada sit amet ex ac tincidunt. Etiam at dictum nibh. Sed tristique elit lorem, in fermentum turpis volutpat id. Nulla nec hendrerit turpis. `


export { markdownEx, markdownEx2 }