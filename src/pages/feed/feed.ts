import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { MovieProvider } from '../../providers/movie/movie';
import { FilmeDetalhesPage } from '../filme-detalhes/filme-detalhes';

/**
 * Generated class for the FeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
  providers: [
    MovieProvider
  ]
})
export class FeedPage {
  public objeto_feed = {
    titulo: "Renato Oliveira",
    data: "November 5, 1955",
    descricao: "Estou criando um App...",
    qntd_likes: 12,
    qntd_comments: 4,
    time_comment: "11h ago"
  }

  public lista_filmes = new Array<any>();

  public nome_usuario:string = "Renato Oliveira do codigo";
  public loader;
  public refresher;
  public isRefreshing: boolean = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private movieProvider: MovieProvider,
    public loadingCtrl: LoadingController
  ) {
  }

  abreLoad() {
    this.loader = this.loadingCtrl.create({
      content: "Carregando filmes..."
    });
    this.loader.present();
  }

  fechaLoad() {
    this.loader.dismiss();
  }

  public somaDoisNumeros(num1:number, num2:number): void{
    alert(num1 + num2);
    console.log(num1 + num2);
  }

  doRefresh(refresher) {
    this.refresher = refresher;//minha var refresher recebe o parametro refresher da função
    this.isRefreshing = true;

    this.carregarFilmes();
  }

  //ionViewDidEnter() usado para sempre q o usuario entrar na tela ele carregar a lista de filmes
  //ionViewDidLoad() usado para carregar uma vez e manter cache
  ionViewDidEnter() {
    this.carregarFilmes();
  }

  abrirDetalhes(filme) {
    this.navCtrl.push(FilmeDetalhesPage, {id: filme.id});
  }

  carregarFilmes() {
    this.abreLoad();
    //this.somaDoisNumeros(10, 99);
    this.movieProvider.getLatestMovies().subscribe(
      data => {
        // const response = (data as any);
        // const objeto_retorno = JSON.parse(response._body);
        this.lista_filmes = (data as any).results;
        console.log(data);
        this.fechaLoad();
        if(this.isRefreshing) {
          this.refresher.complete();
          this.isRefreshing = false;
        }
      }, error => {
        console.log(error);
        this.fechaLoad();
        if(this.isRefreshing) {
          this.refresher.complete();
          this.isRefreshing = false;
        }
      }
    )
  }

}
