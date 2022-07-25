import { IAxiosService, IBrowserStorageService, ICeloService, IDisclaimerService } from '../../services';
import { ICustomElementViewModel } from 'aurelia';
import axios from 'axios';

export class Playground implements ICustomElementViewModel {
  constructor(
    @IBrowserStorageService private readonly browserStorageService: IBrowserStorageService,
    @IAxiosService private readonly axiosService: IAxiosService,
    @IDisclaimerService private readonly disclaimerService: IDisclaimerService,
    @ICeloService private readonly celoService: ICeloService,
  ) {}

  lsSet() {
    this.browserStorageService.lsSet('playground', 'Testing Playground' + new Date());
  }

  lsGet() {
    console.log(this.browserStorageService.lsGet('playground'));
  }

  lsRemove() {
    this.browserStorageService.lsRemove('playground');
  }

  ssSet() {
    this.browserStorageService.ssSet('playground', 'Testing Playground' + new Date());
  }

  ssGet() {
    console.log(this.browserStorageService.ssGet('playground'));
  }

  ssRemove() {
    this.browserStorageService.ssRemove('playground');
  }

  async axiosTest(type: 'success' | 'error') {
    const url = type === 'success' ? 'https://reqres.in/api/users/2' : 'https://reqres.in/api/users/23';
    const item = await axios
      .get(url)
      .then(response => {
        if (response.data) {
          return response.data;
        } else {
          return null;
        }
      })
      .catch(err => {
        this.axiosService.axiosErrorHandler(err);
        return null;
      });

    console.log(item);
  }

  isDappDisclaimed(address: string) {
    console.log(this.disclaimerService.isDappDisclaimed(address));
  }

  ensureDappDisclaimed(address: string) {
    this.disclaimerService.ensureDappDisclaimed(address);
  }

  connect() {
    this.celoService.connect();
  }
}
