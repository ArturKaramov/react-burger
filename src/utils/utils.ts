export function setCookie(
  name: string,
  value: string | null,
  props: {
    [key: string]: string | number | boolean | Date | undefined;
    path?: string;
    expires?: Date | number | string;
  } = {
    path: "/",
  }
) {
  props = props || {};
  let exp = props.expires;
  if (typeof exp == "number" && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp instanceof Date) {
    props.expires = exp.toUTCString();
  }
  if (value !== null && value.startsWith("Bearer ")) {
    value = value.split("Bearer ")[1];
  }
  value ? (value = encodeURIComponent(value)) : (value = null);
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

export function getCookie(name: string) {
  const matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? `Bearer ${decodeURIComponent(matches[1])}` : "";
}

export function deleteCookie(name: string) {
  setCookie(name, null, { expires: -1, path: "/" });
}

export function getDate(date: string) {
  const correctWord: { [key: number]: string } = {
    0: "Сегодня",
    1: "Вчера",
    2: "дня назад",
    5: "дней назад",
    21: "день назад",
  };
  let orderTime: Date = new Date(date);
  let now: Date = new Date();
  let days: number =
    now.getMonth() !== orderTime.getMonth()
      ? Math.floor(
          (now.getTime() - orderTime.getTime()) / (1000 * 60 * 60 * 24)
        )
      : now.getDate() - orderTime.getDate();
  let daysAgo;

  if (days <= 1) {
    daysAgo = correctWord[days];
  } else if (
    (days > 1 && days < 5) ||
    (days > 20 && days % 10 >= 2 && days % 10 <= 4)
  ) {
    daysAgo = days + " " + correctWord[2];
  } else if (days >= 5) {
    daysAgo = days + " " + correctWord[5];
  }
  if (days > 20 && days % 10 === 1) {
    daysAgo = days + " " + correctWord[21];
  }

  return `${daysAgo}, ${orderTime.toLocaleString("ru", {
    hour: "numeric",
    minute: "numeric",
  })} i-GMT+3`;
}
