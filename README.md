# Password backpack

# Description
Password backpack is free, open-source crossplatform (Windows, Linux) app which gives you ability to store all passwords into one, ciphered passsword file which you can safely store everywhere.

It becomes useful when you have lots of accounts on various services and you just can't remember all of them.

# Installation

## Simple installation
1. Clone repository / download as .ZIP, open it
2. Go to dist/installers directory and run installation file which ends with:
* .exe if you are on Windows
* .AppImage if you are on Linux
3. Run installation file && have fun

## Installation via local build
1. Clone repository / download as .ZIP, open it
2. Run ```npm install``` (Node.js has to be installed)
3. run ```npm run build-app```

If you encounter difficulties during linting phase, like:
>Expected linebreaks to be 'LF' but found 'CRLF'  linebreak-style

just add ``` "linebreak-style": 0``` into ```eslintrc.json```.

4. You should have your installation inside /dist directory with proper extension (.AppImage - Linux, .exe - Windows)
5. Run installation file && have fun.

## License
### **MIT**
**Copyright 2017 Marcin Kołodziejczak**

>Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
>The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
