export const CONFIG = {
  API_URLS: [
    "https://jobicy.com/?feed=job_feed",
    "https://jobicy.com/?feed=job_feed&job_categories=smm&job_types=full-time",
    "https://jobicy.com/?feed=job_feed&job_categories=seller&job_types=full-time&search_region=france",
  ],
  
  REDIS_QUEUE_KEY: "xml_json_queue",
  XML_QUEUE_NAME : "xmlJobs",
  CONCURRENCY:2
};
