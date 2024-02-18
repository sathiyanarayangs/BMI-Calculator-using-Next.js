
export async function GET(req) { 
  const searchParams = req.nextUrl.searchParams
  const isInches = searchParams.get('isInches')
  const queryfeet = searchParams.get('feet')
  const queryheightInInches = searchParams.get('heightInInches')
  const queryweight = searchParams.get('weight')
  const queryheightInCm = searchParams.get('heightInCm')
  let m;
  let kg;
  if (isInches=="true") {
    m = (parseInt(queryfeet, 10) * 12 + parseInt(queryheightInInches, 10)) * 0.0254;
    kg = parseInt(queryweight) * 0.45359237;
  } else {
    m = parseFloat(queryheightInCm) * 0.01;
    kg = parseInt(queryweight);
  }
  
  const bmi = parseFloat(kg) / (m * m);

  return Response.json(bmi);
}