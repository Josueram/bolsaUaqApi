const { request } = require('express');
const PDFDocument = require('pdfkit');

function buildPDF(dataCallback, endCallback, data) {

  // Create a document
  const doc = new PDFDocument({ size: 'LEGAL' });
  doc.on('data', dataCallback);
  doc.on('end', endCallback);

  doc.fontSize(9).font('Helvetica').text(`Fecha de solicitud: ${data.fechaRegistro}`, 450, 35)

  doc.fontSize(25).font('Helvetica-Bold').text(data.nombreVacante, 73, 60) // Título de vacante

  doc.fontSize(12).font('Helvetica').text(data.empresa.nombreEmpresa, 74, 105) // 

  doc.fontSize(12).font('Helvetica').text(`${data.rangoSueldo} - ${data.horario}`, 74, 135)

  doc.fontSize(12).font('Helvetica-Bold').text(`Carrera: ${data.carrera}`, 74, 165)

  doc.fontSize(12).font('Helvetica-Bold').text(`Área: ${data.area}`, 74, 185)

  //doc.image(data.empresa.logo, 320, 280, {scale: 0.25}).text('Scale', 320, 265);
  let url = data.empresa.logo
  fetch(url, () => {

    const response = await fetch(src);
    const image = await response.buffer();
    doc.image(image, 0, 200);
    // if (!error && response.statusCode === 200) {
    //     pdf.pipe(fs.createWriteStream('out.pdf'));

    //     var img = new Buffer.from(body, 'base64');
    //     pdf.image(img, 0, 0);

    // }
});
//---

  doc.fontSize(12).font('Helvetica-Bold').text("Lugar de contratación:", 74, 240).text("Dirección de la empresa:", 230, 240).text("Modalidad:", 396, 240)


  doc.fontSize(12).font('Helvetica').text(`${data.empresa.ciudad} - ${data.empresa.direccion} `, 230, 260, {
    width: 135
  })

  doc.fontSize(12).font('Helvetica').text(`${data.tipoContratacion}`, 74, 260, {
    width: 135
  })


  doc.fontSize(12).font('Helvetica').text(`${data.tipoEmpleo}`, 396, 260, {
    width: 135
  })

  doc.moveDown(1);

 

  doc.fontSize(12).font('Helvetica-Bold').text("Teléfono:", 74)
  doc.fontSize(12).font('Helvetica').text(data.contacto, 74)

  doc.fontSize(12).font('Helvetica-Bold').text("Correo:", 74)
  doc.fontSize(12).font('Helvetica').text(data.empresa.emailReclutador, 74)

  // .moveDown(-1).text("Correo:", 230)



  // doc.fontSize(12).font('Helvetica').moveDown(-1).text(data.contacto, 230)

  // acaabajo
  doc.fontSize(12).font('Helvetica-Bold').moveDown(1).text("Nivel de inlgés:", 74)

  doc.fontSize(12).font('Helvetica-Bold').moveDown(-1).text("No. Contratos:", 230)

  doc.fontSize(12).font('Helvetica').text(data.nivelIngles, 74)

  doc.fontSize(12).font('Helvetica').moveDown(-1).text(data.numeroPersonas, 230)

  doc.moveDown(3);

  doc.fontSize(12).font('Helvetica-Bold').text("Requisitos:", 74)

  doc.fontSize(12).font('Helvetica').text(data.requisitos, 74)

  doc.moveDown(1);

  doc.fontSize(12).font('Helvetica-Bold').text("Competencias:", 74)

  doc.fontSize(12).font('Helvetica').text(data.competencias, 74)

  doc.moveDown(1);

  doc.fontSize(12).font('Helvetica-Bold').text("Descripción del empleo:", 74)

  doc.fontSize(12).font('Helvetica').text(data.descripcion, 74)

  doc.moveDown(1);

  doc.fontSize(12).font('Helvetica-Bold').text("Prestaciones:", 74)

  doc.fontSize(12).font('Helvetica').text(data.prestaciones, 74)

  doc.end();
}


module.exports = {
  buildPDF
};

