const PDFDocument = require('pdfkit');

async function buildPDF(dataCallback, endCallback, data) {
  console.log(data)
  // Create a document
  const doc = new PDFDocument({ size: 'LEGAL' });
  doc.on('data', dataCallback);
  doc.on('end', endCallback);

  doc.fontSize(9).font('Helvetica').text(`Fecha de solicitud: ${data.created_at}`, 450, 35)

  doc.fontSize(25).font('Helvetica-Bold').text(data.name, 73, 60) // Título de vacante

  doc.fontSize(12).font('Helvetica').text(data.empresa.name, 74, 105) // 

  doc.fontSize(12).font('Helvetica').text(`${data.salary} - ${data.schedule}`, 74, 135)

  doc.fontSize(12).font('Helvetica-Bold').text(`Carrera: ${data.career}`, 74, 165)

  doc.fontSize(12).font('Helvetica-Bold').text(`Área: ${data.area}`, 74, 185)

//---

  doc.fontSize(12).font('Helvetica-Bold').text("Lugar de contratación:", 74, 240).text("Dirección de la empresa:", 230, 240).text("Modalidad:", 396, 240)


  doc.fontSize(12).font('Helvetica').text(`${data.empresa.city} - ${data.empresa.address} `, 230, 260, {
    width: 135
  })

  // doc.fontSize(12).font('Helvetica').text(`${data.tipoContratacion}`, 74, 260, {
  //   width: 135
  // })


  doc.fontSize(12).font('Helvetica').text(`${data.job_type}`, 396, 260, {
    width: 135
  })

  doc.moveDown(1);

 

  doc.fontSize(12).font('Helvetica-Bold').text("Teléfono:", 74)
  doc.fontSize(12).font('Helvetica').text(data.contact, 74)

  doc.fontSize(12).font('Helvetica-Bold').text("Correo:", 74)
  doc.fontSize(12).font('Helvetica').text(data.empresa.recruiter_email, 74)

  // .moveDown(-1).text("Correo:", 230)



  // doc.fontSize(12).font('Helvetica').moveDown(-1).text(data.contacto, 230)

  // acaabajo
  doc.fontSize(12).font('Helvetica-Bold').moveDown(1).text("Nivel de inlgés:", 74)

  doc.fontSize(12).font('Helvetica-Bold').moveDown(-1).text("No. Contratos:", 230)

  doc.fontSize(12).font('Helvetica').text(data.english_level, 74)

  doc.fontSize(12).font('Helvetica').moveDown(-1).text(data.number_of_vacants, 230)

  doc.moveDown(3);

  doc.fontSize(12).font('Helvetica-Bold').text("Requisitos:", 74)

  doc.fontSize(12).font('Helvetica').text(data.requirements, 74)

  doc.moveDown(1);

  doc.fontSize(12).font('Helvetica-Bold').text("Competencias:", 74)

  doc.fontSize(12).font('Helvetica').text(data.skills, 74)

  doc.moveDown(1);

  doc.fontSize(12).font('Helvetica-Bold').text("Descripción del empleo:", 74)

  doc.fontSize(12).font('Helvetica').text(data.description, 74)

  doc.moveDown(1);

  doc.fontSize(12).font('Helvetica-Bold').text("Prestaciones:", 74)

  doc.fontSize(12).font('Helvetica').text(data.benefits, 74)

  doc.end();
}


module.exports = {
  buildPDF
};

