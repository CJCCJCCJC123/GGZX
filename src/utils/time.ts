export const nowtime = () => {
  const nowTime = new Date().getHours();
  //将格式改写为 2023年1月1日 12:00:00
  const fullTime = new Date().toLocaleString("chinese", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });

  let time = "";
  if (nowTime >= 6 && nowTime < 9) {
    time = "早上好";
  } else if (nowTime >= 9 && nowTime < 12) {
    time = "上午好";
  } else if (nowTime >= 12 && nowTime < 14) {
    time = "中午好";
  } else if (nowTime >= 14 && nowTime < 18) {
    time = "下午好";
  } else if (nowTime >= 18 && nowTime < 24) {
    time = "晚上好";
  } else {
    time = "凌晨好";
  }
  return {
    time,
    nowTime,
    fullTime,
  };
};
