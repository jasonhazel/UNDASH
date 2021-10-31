BUILD=`date +"%Y.%m.%d"`

rm -rf usr && \
npx vue-cli-service build --dest usr/local/emhttp/plugins/undash && \
cp -r endpoints usr/local/emhttp/plugins/undash && \
cp -r nchan usr/local/emhttp/plugins/undash && \
chmod -R +x usr/local/emhttp/plugins/undash/nchan/* && \
tar -cJf releases/undash-$BUILD.txz --owner=0 --group=0 usr/  && \
rm -rf usr  && \
cp undash.plg.template undash.plg && \
sed -i "s/{{BUILD}}/$BUILD/g" undash.plg && \
sed -i '/<CHANGES>/rCHANGELOG' undash.plg && \
echo "BUILD $BUILD COMPLETE"