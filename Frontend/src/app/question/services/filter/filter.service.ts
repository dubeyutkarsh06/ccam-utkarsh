import { Injectable } from '@angular/core';
import { Question } from '../../../shared/models/question/question';

@Injectable({
    providedIn: 'root'
})
export class FilterService {

    private activeFilter: number[] = [];
    private filterList: number[] = [];

    constructor() { }

    public getFilter() {
        if(this.filterList.length > 0) {
            const first = this.filterList[0];
            this.filterList.splice(0,1);
            if(this.filterList.length == 0) {
                this.activeFilter = [first];
            }
            return [first];
        }
        return this.activeFilter;
    }

    public setFilter(filter: number[]) {
        this.activeFilter = filter;
    }

    /**
     * Remove existing(?) filter from activeFilter
     * @param question Question containing the filter
     */
    public removeFilter(question: Question) {
        for (const item of Object.values(question.filterAdd)) {
            if (this.activeFilter.indexOf(item) !== -1) {
                this.activeFilter.splice(this.activeFilter.indexOf(item), 1);
            }
        }
    }

    /**
     * Add filter to active filter, only if it does not exist already
     * @param question Question containing the filter
     */
    public updateFilter(question: Question) {
        for (const item in question.filterAdd) {
            if (question.selectedAnswers.includes(item)) {
                // this.activeFilter.push(question.filterAdd[item]);
                this.activeFilter =[question.filterAdd[item]];
            }
        }
        if(question.selectedAnswers.length == 0){
            for(const item in question.filterAdd){
                if(!this.filterList.includes(question.filterAdd[item]))
                    this.filterList.push(question.filterAdd[item]);
            }
        }
        else {
            this.filterList = [];
        }
        console.log(this.activeFilter);
        console.log(this.filterList);
    }

    /**
     * Check whether the filter necessary to access the question exists
     * @param question Question containing the filter
     */
    public activeFilterIncludes(question: Question): boolean {
        return question.filterReq.length === 0 ? true : this.activeFilter.includes(question.filterReq[0]);
    }

}
