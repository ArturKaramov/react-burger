export function setCookie(name, value, props = { path: "/" }) {
  props = props || {};
  let exp = props.expires;
  if (typeof exp == "number" && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  if (value !== null && value.startsWith("Bearer ")) {
    value = value.split("Bearer ")[1];
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + "=" + value;
  for (const propName in props) {
    updatedCookie += "; " + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }
  document.cookie = updatedCookie;
}

export function getCookie(name) {
  const matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? `Bearer ${decodeURIComponent(matches[1])}` : undefined;
}

export function deleteCookie(name) {
  setCookie(name, null, { expires: -1, path: "/" });
}

export function getDate(date) {
  const correctWord = {
    0: "Сегодня",
    1: "Вчера",
    2: "дня назад",
    5: "дней назад",
  };
  let orderTime = new Date(date);
  let now = new Date();
  let days = now.getDay() - orderTime.getDay();
  let daysAgo;

  if (days <= 1) {
    daysAgo = correctWord[days];
  } else if (days > 1 && days < 6) {
    daysAgo = days + correctWord[2];
  } else {
    daysAgo = days + correctWord[5];
  }

  return `${daysAgo}, ${orderTime.toLocaleString("ru", {
    hour: "numeric",
    minute: "numeric",
  })} i-GMT+3`;
}
