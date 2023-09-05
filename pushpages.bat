set -e

pnpm run build

cd dist

git init

git add .

git commit -m 'chore: update static pages'

git remote add gitee-me https://gitee.com/senong/me.git

git push -u gitee-me main

git remote add github-me https://github.com/senong2000/me.git

git push -u github-me main


