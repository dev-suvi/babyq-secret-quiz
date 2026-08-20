import OrganizerLogin from './OrganizerLogin';

const teams = [
  { category: 'Airport', emoji: '✈️', members: [
    ['Adam','Boarding Pass','adamjones123@hotmail.co.uk'],['Ashu','Gate','ashutosh.saxena23@gmail.com'],['Chintu','Security','naveenmeher07@gmail.com'],['Badri','Runway','nvbadrinarayanan@gmail.com'],['Sayan','Departure','sayan.chanda.2020@gmail.com'],['Ankur','Luggage','shanky442@gmail.com']
  ]},
  { category: 'Holiday', emoji: '🏖️', members: [
    ['Muski','Sunscreen','faizamuskan.fm@gmail.com'],['Sweta','Hotel','gupta.sweta2403@gmail.com'],['Likhi','Souvenir','likhithagompa@gmail.com'],['Ro','Flip-Flops','rohit3864@gmail.com'],['Shivi','Camera','shivisaggi@gmail.com'],['Vrinda','Sunglasses','vrindagrover10@gmail.com']
  ]},
  { category: 'Hiking', emoji: '🥾', members: [
    ['Kan','Compass','kanishkakul0106@gmail.com'],['Nammie','Backpack','namratagupta188@gmail.com'],['Nikhil','Trail','nikhiljain2112@gmail.com'],['Rahul','Map','rahulaneja687@gmail.com'],['Shifu','Boots','shafeeq.rahman01@gmail.com'],['Pragya','Water Bottle','pragyarch@gmail.com']
  ]},
];

export default function OrganizerPage() { return <OrganizerLogin teams={teams} />; }
