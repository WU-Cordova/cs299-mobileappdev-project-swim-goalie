//Program to export things about Swimming events.

const EventList=[
    "Fr50",
    "Fr100",
    "Fr200",
    "Fr500",
    "Fr1000",
    "Fr1650",
    "Bk100",
    "Bk200",
    "Br100",
    "Br200",
    "Fl100",
    "Fl200",
    "IM200",
    "IM400"]



const WorldRecords={
    Fr50:17.63,
    Fr100:39.9,
    Fr200:88.81,
    Fr500:242.31,
    Fr1000:513.93,
    Fr1650:852.08,
    Bk100:43.35,
    Bk200:95.37,
    Br100:49.53,
    Br200:106.35,
    Fl100:42.8,
    Fl200:97.35,
    IM200:96.34,
    IM400:208.82,
}

const EventNames={
    Fr50:"50 Free",
    Fr100:"100 Free",
    Fr200:"200 Free",
    Fr500:"500 Free",
    Fr1000:"1000 Free",
    Fr1650:"1650 Free",
    Bk100:"100 Back",
    Bk200:"200 Back",
    Br100:"100 Breast",
    Br200:"200 Breast",
    Fl100:"100 Fly",
    Fl200:"200 Fly",
    IM200:"200 IM",
    IM400:"400 IM",
}

const EmptyList={
    Fr50:"NS",
    Fr100:"NS",
    Fr200:"NS",
    Fr500:"NS",
    Fr1000:"NS",
    Fr1650:"NS",
    Bk100:"NS",
    Bk200:"NS",
    Br100:"NS",
    Br200:"NS",
    Fl100:"NS",
    Fl200:"NS",
    IM200:"NS",
    IM400:"NS",
}

const FINA_score=(race,time)=>{
    const record=WorldRecords[race]
    if (time=='NS'){
        const score=0;
    }else {
        const score=Math.round(1000*((record/time)**3))
    }
    return (score)
}

export {FINA_score,EmptyList,EventList,EventNames}