import {Elysia} from "elysia";
import "reflect-metadata";
import {AppDataSource} from "./data-source";
import {cors} from "@elysiajs/cors";
import jwt from "@elysiajs/jwt";
import swagger from "@elysiajs/swagger";
import post from "./module/post";
import errorMiddleware from "./middleware/errorMiddleware";
import responseMiddleware from "./middleware/responseMiddleware";
import postRoutes from './routes/post';
AppDataSource.initialize()
    .then(() => {
        console.log('Connected to database')
    })
    .catch((error) => {
        console.log('Connect db error: ' + error)
    });

const app = new Elysia();
//open cors
app.use(cors());
//setup swagger
// app.use(swagger({
//     path: '/api/docs',
//     documentation: {
//         info: {
//             title: 'ElysiaJS',
//             description: 'ElysiaJS API Documentation',
//             version: '1.0.0',
//         },
//         tags: [
//             {name: 'Auth', description: 'Authentication endpoints'},
//         ],
//         components: {
//             securitySchemes: {
//                 JwtAuth: {
//                     type: 'http',
//                     scheme: 'bearer',
//                     bearerFormat: 'JWT',
//                     description: 'Enter JWT Bearer token **_only_**'
//                 }
//             }
//         },
//     },
//
//     swaggerOptions: {
//         persistAuthorization: true
//     }
// }));
//hello endpoint
app.get('/', () => {
    return {
        message: "Bun web server with ElysiaJS"
    }
});

app.group('/api', (ctx: any) => {
    ctx.use(post)
    return ctx;
});

app.use(postRoutes);

// app.onAfterHandle(responseMiddleware)
//     .onError(errorMiddleware)
//     .group('/api', (ctx: any) => {
//         ctx.use(jwt({
//             name: 'jwt',
//             // @ts-ignore
//             secret: Bun.env.JWT_SECRET,
//             exp: '1y'
//         }));
//         //add module
//         ctx.use(auth)
//
//         return ctx;
//     });

// @ts-ignore
app.listen(Bun.env.PORT || 3000);
console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);