let data;
let data2;
accessData();
accessData2();
function accessData() {
  const request = new XMLHttpRequest();
  request.open(
    "GET",
    "https://cors-anywhere.herokuapp.com/http://api.alquran.cloud/v1/surah",
    "true"
  );

  request.onload = function () {
    data = JSON.parse(this.response);

    if (request.status == 200) {
      console.log("Response OK.");

      let i = 0;

      data.data.forEach(() => {
        let newElt = document.createElement("option");

        let textNode = document.createTextNode(data.data[i].englishName);
        newElt.appendChild(textNode);

        document.querySelector("#options").appendChild(newElt);
        i++;
      });
    } else {
      console.log(`Error occurred: Status: ${request.status}`);
    }
  };

  request.send();
}

function accessData2() {
  const request2 = new XMLHttpRequest();

  request2.open(
    "GET",
    `https://cors-anywhere.herokuapp.com/https://api.quran.com/api/v4/chapters?language=en`,
    "true"
  );

  request2.onload = function () {
    data2 = JSON.parse(this.response);

    if (request2.status == 200) {
      console.log("Response OK.");
    } else {
      console.log(`Error occurred: Status: ${request2.status}`);
    }
  };

  request2.send();
}

function getItemSelected() {
  indexOption();

  let surah = document.createElement("tr");
  let surahEnglish = document.createElement("tr");
  let surahTrans = document.createElement("tr");
  let chapter = document.createElement("tr");
  let ayas = document.createElement("tr");

  surah.appendChild(
    document.createTextNode(data2.chapters[selectedItem].name_arabic)
  );
  surahEnglish.appendChild(
    document.createTextNode(data2.chapters[selectedItem].name_complex)
  );

  surahTrans.appendChild(
    document.createTextNode(data2.chapters[selectedItem].translated_name.name)
  );

  chapter.appendChild(document.createTextNode(data2.chapters[selectedItem].id));

  ayas.appendChild(
    document.createTextNode(data2.chapters[selectedItem].verses_count)
  );

  document.querySelector("#surah").appendChild(surah);
  document.querySelector("#surahEnglish").appendChild(surahEnglish);
  document.querySelector("#surahTrans").appendChild(surahTrans);
  document.querySelector("#chapter").appendChild(chapter);
  document.querySelector("#ayas").appendChild(ayas);
}

function indexOption() {
  if(document.querySelector("#dropDown").checked) {
    selectedItem = document.querySelector("#options").selectedIndex;
  }else if(document.querySelector("#entry").checked) {
    selectedItem = document.querySelector("#inputText").value - 1;
  }
}

function clearScreen() {
  document.querySelector("#surah").innerHTML = "";
  document.querySelector("#surahEnglish").innerHTML = "";
  document.querySelector("#surahTrans").innerHTML = "";
  document.querySelector("#chapter").innerHTML = "";
  document.querySelector("#ayas").innerHTML = "";
}
