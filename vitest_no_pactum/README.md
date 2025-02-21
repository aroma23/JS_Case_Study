API_BASE_URL="https://fakestoreapi.com" npx vitest --run test/wrapper.users.api.axios.test.js
API_BASE_URL="https://fakestoreapi.com" npx vitest --run test/wrapper.users.api.pactum.test.js
API_BASE_URL="https://fakestoreapi.com" npx vitest --run test/wrapper.users.api.pactum.coverage.test.js


vitest run --no-fileParallelism
vitest run --fileParallelism
vitest run grep axios grep coverage
<!-- Suite level selection - tags should be in describe block -->
vitest run -t Frictionless

vitest run -t "axios - fetches users successfully"
vitest run -t "fetches users successfully pactum"

python3 -m json.tool reports/report.json | grep -A 1 failed | grep title

python3 -m json.tool reports/report.json | grep -A 1 failed | grep title | sed 's/\"title\"://g'

python3 -m json.tool reports/report.json | grep -A 1 failed | grep title | sed 's/\"title\":/npx vitest run -t/g'
python3 -m json.tool reports/report.json | grep -A 1 failed | grep title | sed 's/\"title\":/npx vitest run -t/g' | sed 's/,//g'



Output

                    npx vitest run -t "axios - fetches users successfully"
                    npx vitest run -t "fetches users successfully pactum"
                    npx vitest run -t "fetches users successfully"


working
---------
python3 -m json.tool reports/report.json | grep -A 1 failed | grep title | sed 's/\"title\": \"//g' | sed 's/  */ /g' | sed 's/\",//g' | sed 's/^.\(.*\)$/\1/' | tr '\n' '|' | sed 's/.$//' > rerun.txt


vitest run -t "`cat rerun.txt`"

output

axios - fetches users successfully|TC001 - fetches users successfully pactum|fetches users successfully

python3 -m json.tool reports/report.json | grep -A 1 failed | grep title | sed 's/\"title\":/npx vitest run -t/g' | sed 's/,//g'> rerun.sh
sh rerun.sh