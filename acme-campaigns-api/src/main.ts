import { NestFactory } from '@nestjs/core'
import { INestApplication } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { patchNestJsSwagger } from 'nestjs-zod'
import { Request, Response } from 'express'

import { AppModule } from './app.module'

const registerSwagger = (app: INestApplication) => {
  patchNestJsSwagger()

  const builder = new DocumentBuilder()

  builder.setTitle('Campaigns API')
  builder.setDescription(
    'Welcome to the **API Documentation**. This API provides a set of endpoints to help you integrate its features into your application efficiently.',
  )

  builder.addServer('http://localhost:4000')

  builder.addTag('Campaign', 'Handles operations for managing and retrieving campaigns.')

  const builderConfig = builder.build()

  const document = SwaggerModule.createDocument(app, builderConfig)

  const http = app.getHttpAdapter()

  http.get('/openapi', (_: Request, res: Response) => {
    res.json(document)
  })

  http.get('/reference', (_, res) => {
    res.setHeader('Content-Type', 'text/html')
    res.send(`
        <!doctype html>
        <html lang="en" data-theme="dark">
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
            <title>Campaigns API</title>
            <script src="https://unpkg.com/@stoplight/elements/web-components.min.js"></script>
            <link rel="stylesheet" href="https://unpkg.com/@stoplight/elements/styles.min.css">
            <link rel="icon" href="https://nodejs.org/static/logos/jsIconWhite.svg" type="image/png">
            <style>
              .sl-elements-api {
                display: flex;
                height: 100vh;
                overflow: hidden;
              }
  
              .sl-elements-api > .sl-flex {
                overflow: hidden;
              }
  
              .sl-elements-api > .sl-overflow-y-auto {
                flex: 1;
                overflow-y: auto;
              }

              .sl-prose p {
                margin-bottom: 0px;
              }

              .sl-prose ul {
                margin-top: 0px;
              }
  
              a.sl-flex.sl-items-center.sl-px-4.sl-py-3.sl-border-t, .sl-stack.sl-stack--vertical.sl-stack--3.sl-flex.sl-flex-col.sl-items-stretch, .sl-flex.sl-flex-grow-0.sl-flex-shrink-0.sl-justify-self-end.sl-resize-x {
                display: none;
              }

              // button[aria-label="Export"] {
              //   display: none !important;
              // }
            </style>
          </head>
  
          <body>
            <elements-api
              logo="https://nodejs.org/static/logos/jsIconWhite.svg"
              apiDescriptionUrl="http://localhost:4000/openapi"
              router="hash"
              layout="responsive"
            />
          </body>
        </html>
      `)
  })
}

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule)

  app.enableCors()

  registerSwagger(app)

  await app.listen(process.env.SERVER_PORT ?? 3000)
}

bootstrap()
