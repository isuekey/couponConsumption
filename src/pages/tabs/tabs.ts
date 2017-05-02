import { Component, ViewChild } from '@angular/core';
import { Tabs } from 'ionic-angular';

import { AboutPage } from '../about/about';
import { HomePage } from '../home/home';
import { MePage } from '../me/me';
import { Writeoff } from '../writeoff/writeoff';

import { AccountInfo } from '../../domain/system.model';

@Component({
    templateUrl: 'tabs.html'
})
export class TabsPage {
    @ViewChild("tabsRef") tabsRef: Tabs;
    tab1Root = HomePage;
    tab2Root = Writeoff;
    tab3Root = AboutPage;
    tab4Root = MePage;
    private accountInfo: AccountInfo;

    constructor() {
        this.accountInfo = AccountInfo.getLocalAccount();
    }
    ionViewDidEnter(){
    }
}
