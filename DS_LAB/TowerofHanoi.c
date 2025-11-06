#include<stdio.h>

void TOH(int n,char s,char m,char d){
    if(n==1){
        printf("Move disc from %c to %c\n",s,d);
    }
    else{
        TOH(n-1,s,d,m);
        printf("Move disc from %c to %c\n",s,d);
        TOH(n-1,m,s,d);
    }
}

int main(){

    int n;
    printf("Enter number of discs: ");
    scanf("%d",&n);
    TOH(n,'1','2','3');

    return 0;
}