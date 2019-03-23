
CREATE TABLE public.companies (
	symbol varchar(5) PRIMARY KEY,
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
    ceo varchar(500) NULL
  );

CREATE TABLE public.target_companies (
  symbol varchar(5) PRIMARY KEY,
  parsed numeric DEFAULT 0
)

 CREATE TABLE public.companies_quotes (
	symbol varchar(5) PRIMARY KEY,
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