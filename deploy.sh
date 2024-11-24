echo "Building the client project"
cd server
npm run build 
cd ..
cd client
npm run build
mv dist ../server/client
echo $(pwd)
cd ..
echo $(pwd)
cd server
npm run start










