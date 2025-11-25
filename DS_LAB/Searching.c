#include <stdio.h>
int linearSearch(int *arr, int size, int key)
{
    for (int i = 0; i < size; i++)
    {
        if (*(arr + i) == key)
        {
            return i;
        }
    }
    return -1;
}

int binarySearch(int arr[], int s, int e, int key)
{
    while (s <= e)
    {
        int mid = (s + e) / 2;
        if (arr[mid] == key)
        {
            return mid;
        }
        else if (arr[mid] > key)
        {
            e = mid - 1;
        }
        else
        {
            s = mid + 1;
        }
    }
    return -1;
}
int main()
{
    int arr[] = {1, 2, 3, 4, 5, 6, 7, 8, 9};
    int choice;
    printf("Enter 1 for linear and 2 for binary search: ");
    scanf("%d", &choice);
    int key;
    printf("Enter key: ");
    scanf("%d", &key);
    switch (choice)
    {
    case 1:
    {
        int ind = linearSearch(arr, 9, key);
        if (ind >= 0)
        {
            printf("Found at index %d", ind);
        }
        else
        {
            printf("Not found");
        }
        break;
    }
    case 2:
    {
        int ind = binarySearch(arr,0,8,key);
        if (ind >= 0)
        {
            printf("Found at index %d", ind);
        }
        else
        {
            printf("Not found");
        }
        break;
    }
    default:
        printf("Invalid Choice!");
        break;
    }
    return 0;
}