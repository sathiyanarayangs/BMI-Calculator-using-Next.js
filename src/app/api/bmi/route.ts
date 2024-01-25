export async function GET() {
	
	const bmiData = {
	  bmi: 22.5, 
	};
  
	return Response.json(bmiData.bmi);
}