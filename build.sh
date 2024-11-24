echo "Building the client project"
cd server
npm i
npm run build 
cd ..
cd client
npm i 
npm run build
mv dist ../server/client
cd ..

