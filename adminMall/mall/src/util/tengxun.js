import COS from 'cos-js-sdk-v5'

let config = {
  SecretId: 'AKIDKTRItGLHwKS4Wmib7NN6ZrteAQxFQ2Xp',
  SecretKey: 'CXbCZfU3SgeMwFH5qALLOBkW35tIRyFG',
  Bucket: 'rsmall-1259693089',
  Region: 'ap-chengdu',
  url: 'images'
}

export let tengxuncloud = (params) => {
  let file = params.file
  return new Promise((resolve, reject) => {
    let cos = new COS({
      SecretId: config.SecretId,
      SecretKey: config.SecretKey
    })
    cos.putObject({
      Bucket: config.Bucket,
      Region: config.Region,
      Key: `/${config.url}/${file.name}`,
      Body: file
    }, function (err, data) {
      console.log(err)
      console.log(data)
      resolve(data)
    })
  })
}
