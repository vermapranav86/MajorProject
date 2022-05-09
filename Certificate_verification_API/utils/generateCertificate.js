const PDFDocument = require('pdfkit');
const fs = require('fs');
const ipfsAPI = require('ipfs-api');



//Connceting to the ipfs network via infura gateway

const ipfs = ipfsAPI('ipfs.infura.io', '5001', {protocol: 'https'})




// Helper to move to next line
function jumpLine(doc, lines) {
  for (let index = 0; index < lines; index++) {
    doc.moveDown();
  }
}



const createCertificate =  (data)=> {
  student=data.studenName;
   couseName=data.course;
   grade='A'
    const doc = new PDFDocument({
        layout: 'landscape',
        size: 'A4',
      });

  console.log(data)
 
 
  doc.pipe(fs.createWriteStream('output.pdf'));

doc.rect(0, 0, doc.page.width, doc.page.height).fill('#fff');

doc.fontSize(10);
// Margin
const distanceMargin = 18;

doc
  .fillAndStroke('#0e8cc3')
  .lineWidth(20)
  .lineJoin('round')
  .rect(
    distanceMargin,
    distanceMargin,
    doc.page.width - distanceMargin * 2,
    doc.page.height - distanceMargin * 2,
  )
  .stroke();

// Header
const maxWidth = 140;
const maxHeight = 70;

doc.image('C:/Users/sawan/Desktop/Result-Managment/utils/assets/winners.png', doc.page.width / 2 - maxWidth / 2, 60, {
  fit: [maxWidth, maxHeight],
  align: 'center',
});

jumpLine(doc, 5)

doc
  .font('C:/Users/sawan/Desktop/Result-Managment/utils/fonts/NotoSansJP-Light.otf')
  .fontSize(10)
  .fill('#021c27')
  .text('CDGI', {
    align: 'center',
  });

jumpLine(doc, 2)

// Content
doc
  .font('C:/Users/sawan/Desktop/Result-Managment/utils/fonts/NotoSansJP-Regular.otf')
  .fontSize(16)
  .fill('#021c27')
  .text('CERTIFICATE OF COMPLETION', {
    align: 'center',
  });

jumpLine(doc, 1)

doc
  .font('C:/Users/sawan/Desktop/Result-Managment/utils/fonts/NotoSansJP-Light.otf')
  .fontSize(10)
  .fill('#021c27')
  .text('Present to', {
    align: 'center',
  });

jumpLine(doc, 2)

doc
  .font('C:/Users/sawan/Desktop/Result-Managment/utils/fonts/NotoSansJP-Bold.otf')
  .fontSize(24)
  .fill('#021c27')
  .text(student, {
    align: 'center',
  });

jumpLine(doc, 1)

doc
  .font('C:/Users/sawan/Desktop/Result-Managment/utils/fonts/NotoSansJP-Light.otf')
  .fontSize(10)
  .fill('#021c27')
  .text('Successfully completed the '+couseName+' with '+grade+' Grade', {
    align: 'center',
  });

jumpLine(doc, 7)

doc.lineWidth(1);

//Signatures
const lineSize = 174;
const signatureHeight = 390;

doc.fillAndStroke('#021c27');
doc.strokeOpacity(0.2);

const startLine1 = 128;
const endLine1 = 128 + lineSize;
doc
  .moveTo(startLine1, signatureHeight)
  .lineTo(endLine1, signatureHeight)
  .stroke();

const startLine2 = endLine1 + 32;
const endLine2 = startLine2 + lineSize;
doc
  .moveTo(startLine2, signatureHeight)
  .lineTo(endLine2, signatureHeight)
  .stroke();

const startLine3 = endLine2 + 32;
const endLine3 = startLine3 + lineSize;
doc
  .moveTo(startLine3, signatureHeight)
  .lineTo(endLine3, signatureHeight)
  .stroke();

doc
  .font('C:/Users/sawan/Desktop/Result-Managment/utils/fonts/NotoSansJP-Light.otf')
  .fontSize(10)
  .fill('#021c27')
  .text(data.rollNumber, startLine1, signatureHeight + 10, {
    columns: 1,
    columnGap: 0,
    height: 40,
    width: lineSize,
    align: 'center',
  });

doc
  .font('C:/Users/sawan/Desktop/Result-Managment/utils/fonts/NotoSansJP-Bold.otf')
  .fontSize(10)
  .fill('#021c27')
  .text('Roll Number', startLine1, signatureHeight + 25, {
    columns: 1,
    columnGap: 0,
    height: 40,
    width: lineSize,
    align: 'center',
  });

doc
  .font('C:/Users/sawan/Desktop/Result-Managment/utils/fonts/NotoSansJP-Bold.otf')
  .fontSize(10)
  .fill('#021c27')
  .text(student, startLine2, signatureHeight + 10, {
    columns: 1,
    columnGap: 0,
    height: 40,
    width: lineSize,
    align: 'center',
  });

doc
  .font('C:/Users/sawan/Desktop/Result-Managment/utils/fonts/NotoSansJP-Bold.otf')
  .fontSize(10)
  .fill('#021c27')
  .text('Student Name', startLine2, signatureHeight + 25, {
    columns: 1,
    columnGap: 0,
    height: 40,
    width: lineSize,
    align: 'center',
  });

doc
  .font('C:/Users/sawan/Desktop/Result-Managment/utils/fonts/NotoSansJP-Light.otf')
  .fontSize(10)
  .fill('#021c27')
  .text(couseName, startLine3, signatureHeight + 10, {
    columns: 1,
    columnGap: 0,
    height: 40,
    width: lineSize,
    align: 'center',
  });



doc
  .font('C:/Users/sawan/Desktop/Result-Managment/utils/fonts/NotoSansJP-Bold.otf')
  .fontSize(10)
  .fill('#021c27')
  .text('Course', startLine3, signatureHeight + 25, {
    columns: 1,
    columnGap: 0,
    height: 40,
    width: lineSize,
    align: 'center',
  });

jumpLine(doc, 4);

// Validation link
const link =
  'http://localhost:4200/verify';

const linkWidth = doc.widthOfString(link);
const linkHeight = doc.currentLineHeight();

doc
  .underline(
    doc.page.width / 2 - linkWidth / 2,
    448,
    linkWidth,
    linkHeight,
    { color: '#021c27' },
  )
  .link(
    doc.page.width / 2 - linkWidth / 2,
    448,
    linkWidth,
    linkHeight,
    link,
  );

doc
  .font('C:/Users/sawan/Desktop/Result-Managment/utils/fonts/NotoSansJP-Light.otf')
  .fontSize(10)
  .fill('#021c27')
  .text(
    link,
    doc.page.width / 2 - linkWidth / 2,
    448,
    linkWidth,
    linkHeight
  );

// Footer
const bottomHeight = doc.page.height - 100;

doc.image('C:/Users/sawan/Desktop/Result-Managment/utils/assets/qr.png', doc.page.width / 2 - 30, bottomHeight, {
  fit: [60, 60],
});

doc.end();







}


const addToIPFS=()=>{

  let testFile = fs.readFileSync("output.pdf");
  let hash=ipfs.files.add(testFile,  function (err, file) {
    if (err) {
      console.log(err);
    }
    console.log(file)
   
    // let result = await db.certificates.create({
    //   CetificateHash:file[0].hash,
    //   StudentRollNumber:student.rollNumber,
    //   InstituteEthaddress:student.InstituteEthaddress
    // }
    // ).then((result) => {
    //   res.redirect("/teacher");
    // });
  
    
  })
}

module.exports = {
    createCertificate,
    addToIPFS
}