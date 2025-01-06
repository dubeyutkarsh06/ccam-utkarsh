import { Component, OnInit, ViewChild } from "@angular/core";
import { EvaluationService } from "src/app/evaluation/services/evaluation/evaluation.service";
import { HttpService } from "src/app/shared/services/http/http.service";
import { Question } from "src/app/shared/models/question/question";
import { FeedbackComponent } from "./feedback/feedback.component";
import { QuestionTableComponent } from "./question-table/question-table.component";
import { UuidService } from "../../shared/services/uuid/uuid.service";
import { FormControl, FormGroup } from "@angular/forms";
import { ExportInterface } from "../../shared/models/response/export.interface";
import { ExportService } from "../../shared/services/export/export.service";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { robotoRegular } from "../../shared/services/font/roboto-regular";
import { robotoBold } from "../../shared/services/font/roboto-bold";
import { robotoItalic } from "../../shared/services/font/roboto-italic";
import { robotoBoltItalic } from "../../shared/services/font/roboto-bolt-italic";

@Component({
  selector: "app-evaluation",
  templateUrl: "./evaluation.component.html",
  styleUrls: ["./evaluation.component.scss"],
})
export class EvaluationComponent implements OnInit {
  constructor(
    private evaluationService: EvaluationService,
    private httpSerivce: HttpService,
    private uuidService: UuidService,
    private exportService: ExportService
  ) {}

  public feedbacks: {};
  public assessmentFinish: {};
  public comparisonChart: {};
  public comparisonTable: {
    questions: Question[];
    uuid: string;
    language: number;
  };
  public form = new FormGroup({
    comparison: new FormControl(""),
  });
  private uuids = [];

  @ViewChild(FeedbackComponent) feedBackComponent: FeedbackComponent;
  @ViewChild(QuestionTableComponent)
  questionTableComponent: QuestionTableComponent;

  ngOnInit() {
    this.initialize();
  }

  /**
   * Init EvaluationService
   * Init Component variables
   */
  public async initialize() {
    await this.evaluationService.initialize();
    this.feedbacks = this.evaluationService.feedback;
    this.assessmentFinish = this.evaluationService.assessmentFinish;
    this.uuids.push(this.uuidService.getUuid());
  }

  /**
   * Update Radar-Chart Input
   * Update Table Datasource
   * @param uuid Comparison UUID
   */
  public async updateComparison(uuid: string) {
    const record = await this.httpSerivce.getRecord(uuid).toPromise();
    const questions = record.record;
    const language = record.language.id;
    if (questions === null) {
      this.form.controls.comparison.setErrors({ incorrect: true });
    } else {
      this.form.controls.comparison.setErrors(null);
      const scoring = await this.httpSerivce
        .getScoring(questions, -1, record.language.name)
        .toPromise();
      this.comparisonChart = {
        uuid,
        scores: this.evaluationService.normalizeScore(10, scoring),
      };
      this.comparisonTable = { questions, uuid, language };
      this.uuids.push(uuid);
    }
  }

  /**
   * creates a PDF from HTML.
   * Used Libraries: HTML2PDF based on jsPDF and HTML2Canvas
   */
  private async downloadPDF() {
    const doc = new jsPDF();

    doc.addFileToVFS("Roboto-Regular.ttf", robotoRegular);
    doc.addFont("Roboto-Regular.ttf", "roboto", "normal");

    doc.addFileToVFS("Roboto-Bold.ttf", robotoBold);
    doc.addFont("Roboto-Bold.ttf", "roboto", "bold");

    doc.addFileToVFS("Roboto-Italic.ttf", robotoItalic);
    doc.addFont("Roboto-Italic.ttf", "roboto", "italic");

    doc.addFileToVFS("Roboto-BoldItalic.ttf", robotoBoltItalic);
    doc.addFont("Roboto-BoldItalic.ttf", "roboto", "bolditalic");

    doc.setFont("roboto");
    // add title to the PDF
    doc.text(20, 15, this.assessmentFinish["title"]);

    // add SUMP Logo to the PDF
    // doc.addImage(document.getElementById('sump-logo'), 'PNG', 132, 4, 58.36363637, 15);

    // add horizontal line
    doc.line(20, 25, 190, 25);

    // add footer logos to the PDF
    const img = document.createElement("img");
    img.src = "assets/LOW-CARB_RGB.jpg";
    img.width = 155;
    img.height = 75;
    doc.addImage(img, "jpeg", 0, 277, 42.5584, 20);
    const img2 = document.createElement("img");
    img2.src = "assets/SUMP_footer.png";
    img2.width = 400.688;
    img2.height = 75;
    doc.addImage(img2, "png", 44.0584, 277, 124.4416, 20);
    const img3 = document.createElement("img");
    img3.src = "assets/CIVITAS2020.jpg";
    img3.width = 145;
    img3.height = 75;
    doc.addImage(img3, "jpeg", 168.5, 277, 40.46666667, 20);

    // add subtitle and the explanation of the chart
    doc.setFontSize(10);
    doc.setFontType("bold");
    doc.text(20, 35, this.assessmentFinish["subtitle"]);
    const textLine = doc.splitTextToSize(
      this.assessmentFinish["explanation"][0].replace(/<br \/><br \/>/g, " "),
      170
    );
    doc.setFontType("normal");
    doc.text(20, 42.5, textLine);

    // add Spider Chart to the PDF
    const chart = document.getElementById("radar_chart");
    const canvas = chart.childNodes[0].childNodes[0]["children"][1];
    const ctx = canvas.getContext("2d");
    ctx.globalCompositeOperation = "destination-over";
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas["width"], canvas["height"]);
    doc.addImage(canvas, "jpeg", 20, 82.5, 170, 84.86780715);

    // add legacy
    doc.setFontSize(7.5);
    doc.setTextColor("#5d5d5d");
    doc.text(20, 175, "0%-34%: " + this.assessmentFinish["rating_text"][0]);
    doc.text(85, 175, "34%-66%: " + this.assessmentFinish["rating_text"][1]);
    doc.text(150, 175, "67%-100%: " + this.assessmentFinish["rating_text"][2]);
    doc.setFontSize(10);

    doc.setTextColor("black");

    doc.addPage("a4");
    doc.addImage(
      document.getElementById("sump-logo"),
      "PNG",
      132,
      4,
      58.36363637,
      15
    );

    // add footer logos to the next PDF page
    doc.addImage(img, "jpeg", 0, 277, 42.5584, 20);
    doc.addImage(img2, "png", 44.0584, 277, 124.4416, 20);
    doc.addImage(img3, "jpeg", 168.5, 277, 40.46666667, 20);

    // add feedback principles to PDF
    if (Object.keys(this.feedbacks).length !== 0) {
      doc.setFontSize(10);
      doc.setFontType("bold");
      doc.text(20, 12.5, this.assessmentFinish["feedback_title"]);
      Object.entries(this.feedbacks).forEach((entry) => {
        doc.setFontType("bold");
        // setting the principle's title
        doc.text(20, 20, entry[0]);
        doc.setFontType("normal");
        // setting the principle's rating text
        doc.text(
          20,
          25,
          this.assessmentFinish["rating_text"][entry[1]["type"]]
        );
        let textList: string[] = [];
        // create an array, that contains the feedback texts.
        textList = textList.concat(
          doc.splitTextToSize(entry[1]["feedbackText"]["text"][0], 170)
        );
        textList.push("");
        textList = textList.concat(
          doc.splitTextToSize(entry[1]["feedbackText"]["text"][1], 170)
        );
        textList.push("");
        // setting the feedback text.
        doc.text(20, 32.5, textList);
        const lineHeight = doc.getTextDimensions(textList[0]).h;

        const lineHeightFactor = doc.getLineHeightFactor();
        // calculate the y-value for the title of the advices
        let y = lineHeightFactor * lineHeight * textList.length + 1 + 32.5;
        doc.setFontType("bold");
        doc.text(
          20,
          y,
          doc.splitTextToSize(entry[1]["feedbackText"]["text"][2], 170)
        );
        y += lineHeight * 2 * lineHeightFactor;
        doc.setFontType("normal");
        for (let i = 0; i < entry[1]["feedbackText"]["list"].length; i++) {
          const adviceList = doc.splitTextToSize(
            entry[1]["feedbackText"]["list"][i],
            168
          );
          doc.setFontType("bold");
          doc.text(20, y, "-");
          doc.setFontType("normal");
          doc.text(22, y, adviceList);
          y += lineHeight * (adviceList.length + 1) * lineHeightFactor;
        }
        doc.addPage("a4");
        doc.addImage(
          document.getElementById("sump-logo"),
          "PNG",
          132,
          4,
          58.36363637,
          15
        );
        // add footer logos to the next PDF page
        doc.addImage(img, "jpeg", 0, 277, 42.5584, 20);
        doc.addImage(img2, "png", 44.0584, 277, 124.4416, 20);
        doc.addImage(img3, "jpeg", 168.5, 277, 40.46666667, 20);

        // add good practices to the PDF
        doc.setFontType("bold");
        doc.text(20, 20, entry[1]["gp_title"]);
        y = lineHeightFactor * lineHeight * 2 + 20;
        for (let i = 0; i < entry[1]["goodPractices"].length; i++) {
          const gp = doc.splitTextToSize(
            entry[1]["goodPractices"][i]["text"],
            165
          );
          doc.setFontType("bold");
          doc.text(223, y, "-");
          doc.setFontType("normal");
          for (const key in gp) {
            if (gp.hasOwnProperty(key)) {
              doc.textWithLink(gp[key], 25, y, {
                url: entry[1]["goodPractices"][i]["url"],
              });
              y += lineHeightFactor * lineHeight;
            }
          }
          y += lineHeight * lineHeightFactor;
        }
        // add further reading recommendations to the PDF
        doc.setFontType("bold");
        y += 1;
        doc.text(20, y, entry[1]["further_readings_title"]);
        y += lineHeightFactor * lineHeight * 2;
        for (let i = 0; i < entry[1]["recommendations"].length; i++) {
          const gp = doc.splitTextToSize(
            entry[1]["recommendations"][i]["text"],
            165
          );
          doc.setFontType("bold");
          doc.text(23, y, "-");
          doc.setFontType("normal");
          for (const key in gp) {
            if (gp.hasOwnProperty(key)) {
              doc.textWithLink(gp[key], 25, y, {
                url: entry[1]["recommendations"][i]["url"],
              });
              y += lineHeightFactor * lineHeight;
            }
          }
          y += lineHeight * lineHeightFactor;
        }

        // add Tool list to the PDF
        doc.setFontType("bold");
        y += 1;
        doc.text(20, y, entry[1]["tools_title"]);
        y += lineHeightFactor * lineHeight * 2;
        for (let i = 0; i < entry[1]["tools"].length; i++) {
          const gp = doc.splitTextToSize(entry[1]["tools"][i]["text"], 165);
          doc.setFontType("bold");
          doc.text(23, y, "-");
          doc.setFontType("normal");
          for (const key in gp) {
            if (gp.hasOwnProperty(key)) {
              doc.textWithLink(gp[key], 25, y, {
                url: entry[1]["tools"][i]["url"],
              });
              y += lineHeightFactor * lineHeight;
            }
          }
          y += lineHeight * lineHeightFactor;
        }

        doc.addPage("a4");
        doc.addImage(
          document.getElementById("sump-logo"),
          "PNG",
          132,
          4,
          58.36363637,
          15
        );
        // add footer logos to the next PDF page
        doc.addImage(img, "jpeg", 0, 277, 42.5584, 20);
        doc.addImage(img2, "png", 44.0584, 277, 124.4416, 20);
        doc.addImage(img3, "jpeg", 168.5, 277, 40.46666667, 20);
      });
    }
    // remove last added page
    const pageCount = doc.internal.getNumberOfPages();
    doc.deletePage(pageCount);
    doc.addPage("a4");
    doc.addImage(
      document.getElementById("sump-logo"),
      "PNG",
      132,
      4,
      58.36363637,
      15
    );

    // add question table to the PDF
    doc.setFontType("bold");
    doc.text(20, 20, this.assessmentFinish["q_table_title"]);
    doc.setFontType("normal");
    const headers = ["id", this.uuidService.getUuid()];

    const datasource = await this.getDataSource();

    jsPDF.autoTableSetDefaults({
      headStyles: {
        fillColor: [255, 211, 89],
        fontStyle: "normal",
        font: "roboto",
      },
    });
    doc.autoTable({
      head: [headers],
      body: datasource,
      theme: "grid",
      startY: 25,
      tableWidth: 170,
      margin: { left: 20 },
      styles: { fontStyle: "normal", font: "roboto" },
    });

    doc.addImage(img, "jpeg", 0, 277, 42.5584, 20);
    doc.addImage(img2, "png", 44.0584, 277, 124.4416, 20);
    doc.addImage(img3, "jpeg", 168.5, 277, 40.46666667, 20);

    const date = new Date();
    const fileName =
      String(date.getUTCFullYear()) +
      String(date.getUTCMonth() + 1) +
      String(date.getUTCDate()) +
      "_" +
      this.uuidService.getUuid() +
      ".pdf";

    doc.save(fileName);
  }

  // public async getCSVFile() {
  //   const response: ExportInterface  = await this.exportService.getCSVString(this.uuids);
  //   const date = new Date();
  //   let filename = 'SUMP_' + String(date.getUTCFullYear()) + String(date.getUTCMonth() + 1) + String(date.getUTCDate());
  //   for (let i = 0; i < this.uuids.length; i++) {
  //     filename = filename + '_' + this.uuids[i];
  //   }
  //   const a  = document.createElement('a');
  //   a.href = 'data:attachment/csv,' + encodeURIComponent(response.csvString);
  //   a.target = '_blank';
  //   a.download = filename + '.csv';
  //   document.body.appendChild(a);
  //   a.click();
  // }

  private getDataSource() {
    const questions = this.evaluationService.questions;
    const arr = [];

    questions.forEach((q) => {
      if (q.title.length > 0) {
        const tmp = [];
        tmp.push(q.title);
        tmp.push(q.selectedAnswers);
        arr.push(tmp);
      }
    });
    return arr;
  }
}
