import OrganizerLogin from './OrganizerLogin';

const teams = [
  { category: 'Airport', emoji: '✈️', members: [['Adam','Boarding Pass'],['Ashu','Gate'],['Chintu','Security'],['Badri','Runway'],['Sayan','Departure'],['Ankur','Luggage']] },
  { category: 'Holiday', emoji: '🏖️', members: [['Muski','Sunscreen'],['Sweta','Hotel'],['Likhi','Souvenir'],['Ro','Flip-Flops'],['Shivi','Camera'],['Vrinda','Sunglasses']] },
  { category: 'Hiking', emoji: '🥾', members: [['Kan','Compass'],['Nammie','Backpack'],['Nikhil','Trail'],['Rahul','Map'],['Shifu','Boots'],['Pragya','Water Bottle']] },
];

export default function OrganizerPage() {
  return <OrganizerLogin teams={teams} />;
}
