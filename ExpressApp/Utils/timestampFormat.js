const timestamp = "2024-03-23T02:01:20.085Z";
const date = new Date(timestamp);

// Convert to Atlanta timezone (Eastern Time)
const options = {
  timeZone: 'America/New_York', // Atlanta timezone
  hour12: false,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  fractionalSecondDigits: 3
};

const getAtlantaTime = (date)=> 
{
    const FormatedDate =  date.toLocaleString('en-US', options);
    return FormatedDate
}

module.exports=getAtlantaTime;