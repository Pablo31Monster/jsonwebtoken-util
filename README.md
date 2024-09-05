# jsonwebtoken-util

Library of functions and middlewares to work with [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) package

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install the models.

```bash
npm install jsonwebtoken-util
```

## Usage

### config

### setConfig({config})

### verifyRefreshToken(req: Request, res: Response, next: NextFunction)

### verifyToken(req: Request, res: Response, next: NextFunction)

### checkHeader(req: Request)

### generateTokens({ data, secret, refreshSecret })

### validateToken({ token, secret })
