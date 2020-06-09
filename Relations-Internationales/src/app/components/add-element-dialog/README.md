Tous les composants de ce fichier sont des [modal](https://material.angular.io/components/dialog/overview)

On appelle une modal via 

`dialogRef = this.dialog.open(AddCourseDialogComponent, matDialogConfig);`

On peut ensuite récupérer ce que la modal renvoie

Par exemple : 

```
dialogRef.afterClosed().subscribe(result => {
    console.log(result)
});
```
