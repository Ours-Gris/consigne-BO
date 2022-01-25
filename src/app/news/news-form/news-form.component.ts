import {Component, Input, OnInit} from '@angular/core';
import {environment} from "../../../environments/environment";
import {AbstractControlOptions, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {News} from "../data/News";
import {NewsService} from "../news.service";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";
import {FileValidator} from "ngx-material-file-input";
import {imageFile} from "../../shared/image-file.validator";
import {AngularEditorConfig} from "@kolkov/angular-editor";

@Component({
    selector: 'app-news-form',
    templateUrl: './news-form.component.html',
    styleUrls: ['./news-form.component.css']
})
export class NewsFormComponent implements OnInit {
    @Input() idNews!: string | null;
    classNews: string = 'col-md-12';
    authUrl = environment.api_base_url;
    newsForm!: FormGroup;
    news!: News;
    readonly maxSize: number = 104857600;
    editorConfig: AngularEditorConfig = {
        editable: true,
        spellcheck: true,
        height: 'auto',
        minHeight: '0',
        maxHeight: 'auto',
        width: 'auto',
        minWidth: '0',
        translate: 'yes',
        enableToolbar: true,
        showToolbar: true,
        placeholder: 'Le contenu de votre actualité',
        defaultParagraphSeparator: '',
        defaultFontName: '',
        defaultFontSize: '',
        toolbarHiddenButtons: [
            [
                'fontName'
            ],
            [
                'customClasses',
                'link',
                'unlink',
                'insertImage',
                'insertVideo',
                'insertHorizontalRule'
            ]
        ]
    };

    titleCtrl: FormControl;
    subtitleCtrl: FormControl;
    contentCtrl: FormControl;
    linkCtrl: FormControl;
    img_newsCtrl: FormControl;

    constructor(
        private fb: FormBuilder,
        private newsService: NewsService,
        private toastr: ToastrService,
        public route: ActivatedRoute,
        public router: Router
    ) {
        this.titleCtrl = fb.control('', [Validators.required, Validators.minLength(3)]);
        this.subtitleCtrl = fb.control('');
        this.linkCtrl = fb.control('');
        this.contentCtrl = fb.control('', [Validators.required, Validators.minLength(3)]);
        this.img_newsCtrl = fb.control(null, [FileValidator.maxContentSize(this.maxSize)]);


        this.newsForm = fb.group({
            title: this.titleCtrl,
            subtitle: this.subtitleCtrl,
            content: this.contentCtrl,
            link: this.linkCtrl,
            img_news: this.img_newsCtrl,
        }, {
            validator: imageFile('img_news')
        } as AbstractControlOptions);
    }

    ngOnInit(): void {
        if (this.idNews) {
            this.classNews = 'col-md-6';
            this.getNews(this.idNews)
        }
    }

    getNews(idNews: string): void {
        this.newsService.getOneNews(idNews).subscribe({
            next: (news: News) => {
                this.news = news;
                this.setFormValue()
            },
            error: error => {
                console.error(error);
                this.router.navigate(['/not-found']).then();
            }
        });
    }

    setFormValue() {
        this.newsForm.setValue({
            title: this.news.title,
            subtitle: this.news.subtitle,
            content: this.news.content,
            link: this.news.link,
            img_news: ''
        });
    }

    onSubmit(): void {
        if (this.newsForm.value.img_news && this.newsForm.value.img_news._files) {
            this.newsForm.value.img_news = this.newsForm.value.img_news._files[0]
            // For delete old img
            if (this.news && this.news.img_name) {
                this.newsForm.value.img_name = this.news.img_name
            }
        }
        if (this.idNews) {
            this.newsService.editNews(this.news.id, this.newsForm.value).subscribe({
                next: () => {
                    this.toastr.success('L\'actualité a été modifié', 'Modifier');
                    this.router.navigateByUrl('/news').catch(err => console.error(err));
                },
                error: (err) => {
                    this.errorSubmit(err)
                }
            })
        } else {
            this.newsService.addNews(this.newsForm.value).subscribe({
                next: () => {
                    this.toastr.success('L\'actualité a été ajouté', 'Ajouter');
                    this.router.navigateByUrl('/news').catch(err => console.error(err));
                },
                error: (err) => {
                    this.errorSubmit(err)
                }
            })
        }

    }

    errorSubmit(error: string[] | string) {
        console.error(error);
        if (Array.isArray(error)) {
            error.map((err: string) => {
                this.toastr.error(err, 'Error !');
            })
        } else {
            this.toastr.error(error, 'Error !');
        }
    }
}
