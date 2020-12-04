const fetch = require('node-fetch');
const readlineSync = require('readline-sync');
var randomize = require('randomatic');
var random = require('random-name')
var randomCountry = require('random-country');

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }


const functionRegist = (userId, pk, uuid, fullName, birth, reff) => new Promise((resolve, reject) => {
    const bodys = {
        userId: userId,
        publicKey: pk,
        witness: reff,
        nationality: randomCountry(),
        countryName: randomCountry({ full: true }),
        deviceUuid: uuid,
        gender: 1,
        name: fullName,
        birthName: fullName,
        fcmToken: `foYOAl2GTV-aCBEdCfD5q6:APA91bGLmBWWalrxF4Xo872-${randomize('aA0', 24)}_${randomize('aA0', 64)}_${randomize('aA0', 26)}`,
        birthday: birth
    }
    fetch('https://proxy.timestope.com:45000/v1/time/user/sign-up', { 
        method: 'POST',
        body: JSON.stringify(bodys),
        headers: {
            'accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json;charset=utf-8',
            'Content-Length': 440,
            'Host': 'proxy.timestope.com:45000',
            'Connection': 'Keep-Alive',
            'Accept-Encoding': 'gzip',
            'User-Agent': 'okhttp/3.12.1'
        }
    })
    .then(res => res.json())
    .then(result => {
        resolve(result);
    })
    .catch(err => reject(err))
});

(async () => {
    const reff = readlineSync.question('[?] Kode reff: ')
    const jumlah = readlineSync.question('[?] Jumlah reff: ')
    for (var i = 0; i < jumlah; i++){
        try {
            const rand = randomize('0', 5)
            const first = random.first()
            const last = random.last()
            const userId = `${first}${rand}`
            const tahun = getRndInteger(1950, 2000)
            const bulan = getRndInteger(1, 12)
            const hari = getRndInteger(1, 30)
            const birth = `${tahun}-${bulan}-${hari}`
            const fullName = `${first} ${last}`
            const uuid = randomize('a0', 18)
            const pk = randomize('aA0', 44)
            const regist = await functionRegist(userId, pk, uuid, fullName, birth, reff)
            if (regist.success == true){
                console.log(`[${i+1}] Regist SUKSES !`)
            } else {
                console.log(`[${i+1}] Regist GAGAL !`)
            }
        } catch (e) {
            console.log(e);
    }   
}
})()