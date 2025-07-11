import dayjs ;
require('dayjs/locale/fr');

dayjs.locale('fr');

export function formatDateNav(calendar, fmt = "YYYY-MM-DD", sep = " - ") {
  var viewName = calendar.getViewName();
  var start = calendar.getDateRangeStart();
  start = dayjs(start);
  if (viewName === "month") {
    start = start.subtract(7, "day").endOf("month");
    start = start.add(1, "day");
  }
  start = start.format(fmt);
  var end = calendar.getDateRangeEnd();
  end = dayjs(end);
  if (viewName === "month") {
    end = end.add(7, "day").startOf("month");
    end = end.subtract(1, "day");
  }
  end = end.format(fmt);
  if (start == end) {
    return start;
  }
  return start + sep + end;
}

function clickPrev(calendar, renderRange, formatNav, sepNav, id) {
  return function (event) {
    if (calendar !== null) {
      calendar.prev();
      renderRange.innerHTML = formatDateNav(calendar, formatNav, sepNav);
      Shiny.setInputValue(id + "_dates", {
        current: dayjs(calendar.getDate()).format(),
        start: dayjs(calendar.getDateRangeStart()).format(),
        end: dayjs(calendar.getDateRangeEnd()).format(),
      });
    }
  };
}

function clickNext(calendar, renderRange, formatNav, sepNav, id) {
  return function (event) {
    if (calendar !== null) {
      calendar.next();
      renderRange.innerHTML = formatDateNav(calendar, formatNav, sepNav);
      Shiny.setInputValue(id + "_dates", {
        current: dayjs(calendar.getDate()).format(),
        start: dayjs(calendar.getDateRangeStart()).format(),
        end: dayjs(calendar.getDateRangeEnd()).format(),
      });
    }
  };
}

function clickToday(calendar, renderRange, formatNav, sepNav, id) {
  return function (event) {
    if (calendar !== null) {
      calendar.today();
      renderRange.innerHTML = formatDateNav(calendar, formatNav, sepNav);
      Shiny.setInputValue(id + "_dates", {
        current: dayjs(calendar.getDate()).format(),
        start: dayjs(calendar.getDateRangeStart()).format(),
        end: dayjs(calendar.getDateRangeEnd()).format(),
      });
    }
  };
}

export function addNavigation(calendar, id, options) {
  var formatNav = options.fmt_date;
  var sepNav = options.sep_date;
  var renderRange = document.getElementById(id + "_renderRange");
  renderRange.innerHTML = formatDateNav(calendar, formatNav, sepNav);

  var prev = document.getElementById(id + "_prev");
  prev.className += options.class;
  prev.innerHTML = options.prev_label;
  prev.removeEventListener(
    "click",
    clickPrev(calendar, renderRange, formatNav, sepNav, id)
  );
  prev.addEventListener(
    "click",
    clickPrev(calendar, renderRange, formatNav, sepNav, id)
  );

  var next = document.getElementById(id + "_next");
  next.className += options.class;
  next.innerHTML = options.next_label;
  next.removeEventListener(
    "click",
    clickNext(calendar, renderRange, formatNav, sepNav, id)
  );
  next.addEventListener(
    "click",
    clickNext(calendar, renderRange, formatNav, sepNav, id)
  );

  var today = document.getElementById(id + "_today");
  today.className += options.class;
  today.innerHTML = options.today_label;
  today.removeEventListener(
    "click",
    clickToday(calendar, renderRange, formatNav, sepNav, id)
  );
  today.addEventListener(
    "click",
    clickToday(calendar, renderRange, formatNav, sepNav, id)
  );

  if (options.hasOwnProperty("bg")) {
    prev.style.background = options.bg;
    next.style.background = options.bg;
    today.style.background = options.bg;
  }
  if (options.hasOwnProperty("color")) {
    prev.style.color = options.color;
    next.style.color = options.color;
    today.style.color = options.color;
  }
}


export function getNavOptions(id) {
  var htmlWidgetsObj = HTMLWidgets.find("#" + id);
  var widgetObj;
  if (typeof htmlWidgetsObj != "undefined") {
    widgetObj = htmlWidgetsObj.getNavOptions();
  }
  return widgetObj;
}
