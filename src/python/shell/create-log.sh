#! /bin/bash
cd ../../..
git log --reverse --pretty=format:"%h - %an, %ad : %s" --date=short > git-log-frontend.txt
mv git-log-frontend.txt src/python
