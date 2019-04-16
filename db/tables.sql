 CREATE TABLE public.logos (
   symbol varchar(15)  PRIMARY KEY,
   base64 text,
   url text,
   quality_score bigint
 ); 

 CREATE TABLE public.key_stats ( 
  symbol varchar(15) PRIMARY KEY,
  marketcap bigint,
  week52high bigint,
  week52low bigint,
  week52change bigint,
  sharesOutstanding bigint,
  float bigint, 
  avg10Volume bigint,
  avg30Volume bigint,
  day200MovingAvg bigint,
  day50MovingAvg bigint,
  employees bigint,
  maxChangePercent bigint,
  year5ChangePercent bigint,
  year2ChangePercent bigint,
  year1ChangePercent bigint,
  ytdChangePercent bigint,
  month6ChangePercent bigint,
  month3ChangePercent bigint,
  month1ChangePercent bigint,
  day30ChangePercent bigint,
  day5ChangePercent bigint 
 );
 
 CREATE TABLE public.estimates (
  symbol varchar(15) PRIMARY KEY,
   consensusEPS bigint,
   numberOfEstimtes bigint,
   fiscalPeriod text,
   fiscalEndDate text,
   reportDate text 
 );
 
 CREATE TABLE public.news (
  symbol varchar(15) PRIMARY KEY,
    dt bigint,
    headline text,
    source text,
    url text,
    summary text,
    related text,
    image text,
    lang text,
    hasPaywall boolean
 );
  
CREATE TABLE public.social_sentiment (
  symbol varchar(15) PRIMARY KEY,
  "date" date,
  minute varchar(2),
  sentiment float,
  totalScores float,
  positive float,
  negative float
);

CREATE TABLE public.companies (
	symbol varchar(15) PRIMARY KEY,
	"name" varchar(500) NULL,
    exchange varchar(500) NULL,
    industry varchar(500) NULL,
    website varchar(500) NULL,
    "description" varchar(500) NULL,
    issueType varchar(500) NULL,
    sector varchar(500) NULL,
    securityName varchar(500) NULL,
    tags JSON NULL,
    employees BIGINT NULL,
    ceo varchar(500) NULL,
	region text null,
	currency text null
  ); 

CREATE TABLE public.ceo_compensation (
    symbol varchar(15) PRIMARY KEY,
    name text,
    bonus bigint,
    stockAwards bigint,
    optionAwards bigint,
    nonEquityIncentives bigint,
    pensionAndDeferred bigint,
    otherComp bigint,
    total bigint,
    year int
  );

CREATE TABLE public.target_companies (
  symbol varchar(15) PRIMARY KEY,
  parsed numeric DEFAULT 0
);

 CREATE TABLE public.company_quotes (
	symbol varchar(15) PRIMARY KEY,
	"name" varchar(500) NULL,
	calculationPrice varchar NULL,
	"open" float8 NULL,
	openTime float8 null,
	"close" float8 null,
	closeTime float8 NULL,
    high float8 NULL,
    low float8 NULL,
    latestPrice float8 NULL,
    latestSource varchar(25) NULL,
    latestTime varchar(25) NULL,
    latestUpdate bigint NULL,
    latestVolume bigint NULL,
    iexRealtimePrice float8 NULL,
    iexRealtimeSize float8 NULL,
    iexLastUpdated float8 NULL,
    delayedPrice float8 NULL,
    delayedPriceTime float8 NULL,
    extendedPrice float8 NULL,
    extendedChange float8 NULL,
    extendedChangePercent float8 NULL,
    extendedPriceTime float8 NULL,
    previousClose float8 NULL,
    change float8 NULL,
    changePercent float8 NULL,
    iexMarketPercent float8 NULL,
    iexVolume float8 NULL,
    avgTotalVolume float8 NULL,
    iexBidPrice float8 NULL,
    iexBidSize float8 NULL,
    iexAskPrice float8 NULL,
    iexAskSize float8 NULL,
    marketCap float8 NULL,
    week52High float8 NULL,
    week52Low float8 NULL,
    ytdChange float8 NULL,
    peRatio float8 NULL
); 
 