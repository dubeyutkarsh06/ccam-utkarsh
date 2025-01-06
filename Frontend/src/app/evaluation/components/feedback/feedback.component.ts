import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatAccordion} from "@angular/material/expansion";


@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit{

  @Input() feedback;
  @Input() rating_text;
  @ViewChild('accordion') myAccordion: MatAccordion;
  public feedbackArr = [];
  public reports = {
    'Automation Awareness Raising': {
      'Policy and Strategy': 'https://www.rupprecht-consult.eu/fileadmin/user_upload/CCAM_SAT/1_1_Policy_and_Strategy_Awareness.pdf',
      // tslint:disable-next-line:max-line-length
      'Mobility Management and Regulation': 'https://www.rupprecht-consult.eu/fileadmin/user_upload/CCAM_SAT/2_1_Mobility_Management_and_Regulation_Awareness.pdf',
      // tslint:disable-next-line:max-line-length
      'Organisation and Personnel': 'https://www.rupprecht-consult.eu/fileadmin/user_upload/CCAM_SAT/3_1_Organisation_and_Personnel_Awareness.pdf',
      // tslint:disable-next-line:max-line-length
      'Infrastructure and Traffic Management': 'https://www.rupprecht-consult.eu/fileadmin/user_upload/CCAM_SAT/4_1_Infrastructure_and_Traffic_Management_Awareness.pdf',
      // tslint:disable-next-line:max-line-length
      'Stakeholder and Citizen Engagement': 'https://www.rupprecht-consult.eu/fileadmin/user_upload/CCAM_SAT/5_1_Stakeholder_and_Citizen_Engagement_Awareness.pdf',
      'MaaS/Intermodality recommendation': 'https://www.rupprecht-consult.eu/fileadmin/user_upload/CCAM_SAT/6_MaaS_recommendation.pdf'
    },
    'Planning for Automation-readiness': {
      'Policy and Strategy': 'https://www.rupprecht-consult.eu/fileadmin/user_upload/CCAM_SAT/1_2_Policy_and_Strategy_Planning.pdf',
      // tslint:disable-next-line:max-line-length
      'Mobility Management and Regulation': 'https://www.rupprecht-consult.eu/fileadmin/user_upload/CCAM_SAT/2_2_Mobility_Management_and_Regulation_Planning.pdf',
      // tslint:disable-next-line:max-line-length
      'Organisation and Personnel': 'https://www.rupprecht-consult.eu/fileadmin/user_upload/CCAM_SAT/3_2_Organisation_and_Personnel_Planning.pdf',
      // tslint:disable-next-line:max-line-length
      'Infrastructure and Traffic Management': 'https://www.rupprecht-consult.eu/fileadmin/user_upload/CCAM_SAT/4_2_Infrastructure_and_Traffic_Management_Planning.pdf',
      // tslint:disable-next-line:max-line-length
      'Stakeholder and Citizen Engagement': 'https://www.rupprecht-consult.eu/fileadmin/user_upload/CCAM_SAT/5_2_Stakeholder_and_Citizen_Engagement_Planning.pdf',
      'MaaS/Intermodality recommendation': 'https://www.rupprecht-consult.eu/fileadmin/user_upload/CCAM_SAT/6_MaaS_recommendation.pdf'
    },
    'Preparing for the implementation of automation-ready measures': {
      'Policy and Strategy': 'https://www.rupprecht-consult.eu/fileadmin/user_upload/CCAM_SAT/1_3_Policy_and_Strategy_Implementation.pdf',
      // tslint:disable-next-line:max-line-length
      'Mobility Management and Regulation': 'https://www.rupprecht-consult.eu/fileadmin/user_upload/CCAM_SAT/2_3_Mobility_Management_and_Regulation_Implementation.pdf',
      // tslint:disable-next-line:max-line-length
      'Organisation and Personnel': 'https://www.rupprecht-consult.eu/fileadmin/user_upload/CCAM_SAT/3_3_Organisation_and_Personnel_Implementation.pdf',
      // tslint:disable-next-line:max-line-length
      'Infrastructure and Traffic Management': 'https://www.rupprecht-consult.eu/fileadmin/user_upload/CCAM_SAT/4_3_Infrastructure_and_Traffic_Management_Implementation.pdf',
      // tslint:disable-next-line:max-line-length
      'Stakeholder and Citizen Engagement': 'https://www.rupprecht-consult.eu/fileadmin/user_upload/CCAM_SAT/5_3_Stakeholder_and_Citizen_Engagement_Implementation.pdf',
      'MaaS/Intermodality recommendation': 'https://www.rupprecht-consult.eu/fileadmin/user_upload/CCAM_SAT/6_MaaS_recommendation.pdf'
    },
    'Sensibilisierung für die Automatisierung': {
      // tslint:disable-next-line:max-line-length
      'Politik und Strategie': 'https://www.rupprecht-consult.eu/fileadmin/user_upload/CCAM_SAT/CCAM_SAT_DE/1_1_Policy_and_Strategy_Awareness-DE.pdf',
      // tslint:disable-next-line:max-line-length
      'Mobilitätsmanagement und Regelung': 'https://www.rupprecht-consult.eu/fileadmin/user_upload/CCAM_SAT/CCAM_SAT_DE/2_1_Mobility_Management_and_Regulation_Awareness-DE.pdf',
      // tslint:disable-next-line:max-line-length
      'Organisation und Personal': 'https://www.rupprecht-consult.eu/fileadmin/user_upload/CCAM_SAT/CCAM_SAT_DE/3_1_Organisation_and_Personnel_Awareness-DE.pdf',
      // tslint:disable-next-line:max-line-length
      'Infrastruktur und Verkehrsmanagement': 'https://www.rupprecht-consult.eu/fileadmin/user_upload/CCAM_SAT/CCAM_SAT_DE/4_1_Infrastructure_and_Traffic_Management_Awareness-DE.pdf',
      // tslint:disable-next-line:max-line-length
      'Einbeziehung von Interessengruppen und Nutzer*innen': 'https://www.rupprecht-consult.eu/fileadmin/user_upload/CCAM_SAT/CCAM_SAT_DE/5_1_Stakeholder_and_Citizen_Engagement_Awareness-DE.pdf',
      // tslint:disable-next-line:max-line-length
      'MaaS/Intermodality recommendation': 'https://www.rupprecht-consult.eu/fileadmin/user_upload/CCAM_SAT/CCAM_SAT_DE/6_MaaS_recommendation-DE.pdf'
    },
    'Planung für die Automation Readiness': {
      // tslint:disable-next-line:max-line-length
      'Politik und Strategie': 'https://www.rupprecht-consult.eu/fileadmin/user_upload/CCAM_SAT/CCAM_SAT_DE/1_2_Policy_and_Strategy_Planning-DE.pdf',
      // tslint:disable-next-line:max-line-length
      'Mobilitätsmanagement und Regelung': 'https://www.rupprecht-consult.eu/fileadmin/user_upload/CCAM_SAT/CCAM_SAT_DE/2_2_Mobility_Management_and_Regulation_Planning-DE.pdf',
      // tslint:disable-next-line:max-line-length
      'Organisation und Personal': 'https://www.rupprecht-consult.eu/fileadmin/user_upload/CCAM_SAT/CCAM_SAT_DE/3_2_Organisation_and_Personnel_Planning-DE.pdf',
      // tslint:disable-next-line:max-line-length
      'Infrastruktur und Verkehrsmanagement': 'https://www.rupprecht-consult.eu/fileadmin/user_upload/CCAM_SAT/CCAM_SAT_DE/4_2_Infrastructure_and_Traffic_Management_Planning-DE.pdf',
      // tslint:disable-next-line:max-line-length
      'Einbeziehung von Interessengruppen und Nutzer*innen': 'https://www.rupprecht-consult.eu/fileadmin/user_upload/CCAM_SAT/CCAM_SAT_DE/5_2_Stakeholder_and_Citizen_Engagement_Planning-DE.pdf',
      // tslint:disable-next-line:max-line-length
      'MaaS/Intermodality recommendation': 'https://www.rupprecht-consult.eu/fileadmin/user_upload/CCAM_SAT/CCAM_SAT_DE/6_MaaS_recommendation-DE.pdf'
    },
    'Vorbereitung auf die Umsetzung von automation-ready Maßnahmen': {
      // tslint:disable-next-line:max-line-length
      'Politik und Strategie': 'https://www.rupprecht-consult.eu/fileadmin/user_upload/CCAM_SAT/CCAM_SAT_DE/1_3_Policy_and_Strategy_Implementation-DE.pdf',
      // tslint:disable-next-line:max-line-length
      'Mobilitätsmanagement und Regelung': 'https://www.rupprecht-consult.eu/fileadmin/user_upload/CCAM_SAT/CCAM_SAT_DE/2_3_Mobility_Management_and_Regulation_Implementation-DE.pdf',
      // tslint:disable-next-line:max-line-length
      'Organisation und Personal': 'https://www.rupprecht-consult.eu/fileadmin/user_upload/CCAM_SAT/CCAM_SAT_DE/3_3_Organisation_and_Personnel_Implementation-DE.pdf',
      // tslint:disable-next-line:max-line-length
      'Infrastruktur und Verkehrsmanagement': 'https://www.rupprecht-consult.eu/fileadmin/user_upload/CCAM_SAT/CCAM_SAT_DE/4_3_Infrastructure_and_Traffic_Management_Implementation-DE.pdf',
      // tslint:disable-next-line:max-line-length
      'Einbeziehung von Interessengruppen und Nutzer*innen': 'https://www.rupprecht-consult.eu/fileadmin/user_upload/CCAM_SAT/CCAM_SAT_DE/5_3_Stakeholder_and_Citizen_Engagement_Implementation-DE.pdf',
      // tslint:disable-next-line:max-line-length
      'MaaS/Intermodality recommendation': 'https://www.rupprecht-consult.eu/fileadmin/user_upload/CCAM_SAT/CCAM_SAT_DE/6_MaaS_recommendation-DE.pdf'
    }
  };
  constructor() {}

  ngOnInit(): void {
    for(let element in this.feedback) {
      this.feedbackArr.push({key: element, value: this.feedback[element]});
    }
  }

  getURL(row: string, column: string): string {
    return this.reports[row][column] || '';
  }
}
