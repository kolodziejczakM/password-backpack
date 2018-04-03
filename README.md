# Password backpack
[url=https://ibb.co/mzKbHH][img]https://preview.ibb.co/jSi3xH/video_2018_04_03_22_45_13.gif[/img][/url]
[url=https://imgbb.com/]free img[/url]
# Description
Password backpack is free, open-source crossplatform (Windows, Linux) app which gives you ability to store all passwords into one, ciphered passsword file which you can safely store everywhere.

It becomes useful when you have lots of accounts on various services and you just can't remember all of them.

# Installation

## Installation via local build (recommended)
1. Clone repository / download as .ZIP, open it
2. Run ```npm install``` (Node.js has to be installed)
3. run ```npm run build-app```

If you encounter difficulties during linting phase, like:
>Expected linebreaks to be 'LF' but found 'CRLF'  linebreak-style

just add ``` "linebreak-style": 0``` into ```eslintrc.json```.

4. You should have your installation inside /dist directory with proper extension (.AppImage - Linux, .exe - Windows)
5. Run installation file && have fun.

## Simple installation (soon)
Work in progress

# Development
To start development simply run ```npm run start-dev```. This command will trigger Electron (with hot reloading) and Chrome.
To run lint: ```npm run lint```
Lint is triggered on every GIT push via ```pre-push``` package.
## License
### **MIT**
**Copyright 2018 Marcin Kołodziejczak**

>Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
>The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
