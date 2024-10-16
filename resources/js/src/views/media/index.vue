<template>
    <div>
      <ul class="flex space-x-2 rtl:space-x-reverse">
        <li>
          <a href="javascript:;" class="text-primary hover:underline">Escritorio</a>
        </li>
        <li class="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
          <span>Media</span>
        </li>
      </ul>

      <div class="panel pb-1.5 mt-6">
            <div class="flex flex-col sm:flex-row sm:justify-between ltr:ml-auto rtl:mr-auto">
                <h6 class="text-3xl font-bold">Media</h6>
                <div class="flex gap-3 items-center">
                    <div>
                    <button
                        type="button"
                        class="btn btn-outline-primary p-2"
                        :class="{ 'bg-primary text-white': displayType === 'list' }"
                        @click="displayType = 'list'"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5">
                            <path d="M2 5.5L3.21429 7L7.5 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path
                                opacity="0.5"
                                d="M2 12.5L3.21429 14L7.5 10"
                                stroke="currentColor"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                            <path d="M2 19.5L3.21429 21L7.5 17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M22 19L12 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                            <path opacity="0.5" d="M22 12L12 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                            <path d="M22 5L12 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                        </svg>
                    </button>
                </div>
                <div>
                    <button
                        type="button"
                        class="btn btn-outline-primary p-2"
                        :class="{ 'bg-primary text-white': displayType === 'grid' }"
                        @click="displayType = 'grid'"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5">
                            <path
                                opacity="0.5"
                                d="M2.5 6.5C2.5 4.61438 2.5 3.67157 3.08579 3.08579C3.67157 2.5 4.61438 2.5 6.5 2.5C8.38562 2.5 9.32843 2.5 9.91421 3.08579C10.5 3.67157 10.5 4.61438 10.5 6.5C10.5 8.38562 10.5 9.32843 9.91421 9.91421C9.32843 10.5 8.38562 10.5 6.5 10.5C4.61438 10.5 3.67157 10.5 3.08579 9.91421C2.5 9.32843 2.5 8.38562 2.5 6.5Z"
                                stroke="currentColor"
                                stroke-width="1.5"
                            />
                            <path
                                opacity="0.5"
                                d="M13.5 17.5C13.5 15.6144 13.5 14.6716 14.0858 14.0858C14.6716 13.5 15.6144 13.5 17.5 13.5C19.3856 13.5 20.3284 13.5 20.9142 14.0858C21.5 14.6716 21.5 15.6144 21.5 17.5C21.5 19.3856 21.5 20.3284 20.9142 20.9142C20.3284 21.5 19.3856 21.5 17.5 21.5C15.6144 21.5 14.6716 21.5 14.0858 20.9142C13.5 20.3284 13.5 19.3856 13.5 17.5Z"
                                stroke="currentColor"
                                stroke-width="1.5"
                            />
                            <path
                                d="M2.5 17.5C2.5 15.6144 2.5 14.6716 3.08579 14.0858C3.67157 13.5 4.61438 13.5 6.5 13.5C8.38562 13.5 9.32843 13.5 9.91421 14.0858C10.5 14.6716 10.5 15.6144 10.5 17.5C10.5 19.3856 10.5 20.3284 9.91421 20.9142C9.32843 21.5 8.38562 21.5 6.5 21.5C4.61438 21.5 3.67157 21.5 3.08579 20.9142C2.5 20.3284 2.5 19.3856 2.5 17.5Z"
                                stroke="currentColor"
                                stroke-width="1.5"
                            />
                            <path
                                d="M13.5 6.5C13.5 4.61438 13.5 3.67157 14.0858 3.08579C14.6716 2.5 15.6144 2.5 17.5 2.5C19.3856 2.5 20.3284 2.5 20.9142 3.08579C21.5 3.67157 21.5 4.61438 21.5 6.5C21.5 8.38562 21.5 9.32843 20.9142 9.91421C20.3284 10.5 19.3856 10.5 17.5 10.5C15.6144 10.5 14.6716 10.5 14.0858 9.91421C13.5 9.32843 13.5 8.38562 13.5 6.5Z"
                                stroke="currentColor"
                                stroke-width="1.5"
                            />
                        </svg>
                    </button>
                </div>
                    <div class="relative max-w-xs">
                        <input v-model="params.search" type="text" class="form-input w-full pr-10" placeholder="Buscar..." @input="handleInput"/>
                        <button v-if="params.search" @click="clearSearch" class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500" >
                            ✕
                        </button>
                    </div>
                </div>
            </div>

            <div class="h-px border-b border-[#e0e6ed] dark:border-[#1b2e4b] my-2"></div>

            <div class="flex flex-wrap flex-col md:flex-row xl:w-auto justify-between items-center px-4 pb-4">
                <div class="w-full sm:w-auto grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">

                    <button type="button" class="btn btn-outline-warning flex"  @click="editFolder()">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="mr-1">
                            <path opacity="0.5" d="M10 14H12M12 14H14M12 14V16M12 14V12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                            <path d="M2 6.94975C2 6.06722 2 5.62595 2.06935 5.25839C2.37464 3.64031 3.64031 2.37464 5.25839 2.06935C5.62595 2 6.06722 2 6.94975 2C7.33642 2 7.52976 2 7.71557 2.01738C8.51665 2.09229 9.27652 2.40704 9.89594 2.92051C10.0396 3.03961 10.1763 3.17633 10.4497 3.44975L11 4C11.8158 4.81578 12.2237 5.22367 12.7121 5.49543C12.9804 5.64471 13.2651 5.7626 13.5604 5.84678C14.0979 6 14.6747 6 15.8284 6H16.2021C18.8345 6 20.1506 6 21.0062 6.76946C21.0849 6.84024 21.1598 6.91514 21.2305 6.99383C22 7.84935 22 9.16554 22 11.7979V14C22 17.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V6.94975Z" stroke="currentColor" stroke-width="1.5"/>
                        </svg>
                        Nuevo folder
                    </button>

                    <button type="button" class="btn btn-outline-primary flex"  @click="redirectToCreate()">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="mr-1">
                            <path d="M15.3929 4.05365L14.8912 4.61112L15.3929 4.05365ZM19.3517 7.61654L18.85 8.17402L19.3517 7.61654ZM21.654 10.1541L20.9689 10.4592V10.4592L21.654 10.1541ZM3.17157 20.8284L3.7019 20.2981H3.7019L3.17157 20.8284ZM20.8284 20.8284L20.2981 20.2981L20.2981 20.2981L20.8284 20.8284ZM14 21.25H10V22.75H14V21.25ZM2.75 14V10H1.25V14H2.75ZM21.25 13.5629V14H22.75V13.5629H21.25ZM14.8912 4.61112L18.85 8.17402L19.8534 7.05907L15.8947 3.49618L14.8912 4.61112ZM22.75 13.5629C22.75 11.8745 22.7651 10.8055 22.3391 9.84897L20.9689 10.4592C21.2349 11.0565 21.25 11.742 21.25 13.5629H22.75ZM18.85 8.17402C20.2034 9.3921 20.7029 9.86199 20.9689 10.4592L22.3391 9.84897C21.9131 8.89241 21.1084 8.18853 19.8534 7.05907L18.85 8.17402ZM10.0298 2.75C11.6116 2.75 12.2085 2.76158 12.7405 2.96573L13.2779 1.5653C12.4261 1.23842 11.498 1.25 10.0298 1.25V2.75ZM15.8947 3.49618C14.8087 2.51878 14.1297 1.89214 13.2779 1.5653L12.7405 2.96573C13.2727 3.16993 13.7215 3.55836 14.8912 4.61112L15.8947 3.49618ZM10 21.25C8.09318 21.25 6.73851 21.2484 5.71085 21.1102C4.70476 20.975 4.12511 20.7213 3.7019 20.2981L2.64124 21.3588C3.38961 22.1071 4.33855 22.4392 5.51098 22.5969C6.66182 22.7516 8.13558 22.75 10 22.75V21.25ZM1.25 14C1.25 15.8644 1.24841 17.3382 1.40313 18.489C1.56076 19.6614 1.89288 20.6104 2.64124 21.3588L3.7019 20.2981C3.27869 19.8749 3.02502 19.2952 2.88976 18.2892C2.75159 17.2615 2.75 15.9068 2.75 14H1.25ZM14 22.75C15.8644 22.75 17.3382 22.7516 18.489 22.5969C19.6614 22.4392 20.6104 22.1071 21.3588 21.3588L20.2981 20.2981C19.8749 20.7213 19.2952 20.975 18.2892 21.1102C17.2615 21.2484 15.9068 21.25 14 21.25V22.75ZM21.25 14C21.25 15.9068 21.2484 17.2615 21.1102 18.2892C20.975 19.2952 20.7213 19.8749 20.2981 20.2981L21.3588 21.3588C22.1071 20.6104 22.4392 19.6614 22.5969 18.489C22.7516 17.3382 22.75 15.8644 22.75 14H21.25ZM2.75 10C2.75 8.09318 2.75159 6.73851 2.88976 5.71085C3.02502 4.70476 3.27869 4.12511 3.7019 3.7019L2.64124 2.64124C1.89288 3.38961 1.56076 4.33855 1.40313 5.51098C1.24841 6.66182 1.25 8.13558 1.25 10H2.75ZM10.0298 1.25C8.15538 1.25 6.67442 1.24842 5.51887 1.40307C4.34232 1.56054 3.39019 1.8923 2.64124 2.64124L3.7019 3.7019C4.12453 3.27928 4.70596 3.02525 5.71785 2.88982C6.75075 2.75158 8.11311 2.75 10.0298 2.75V1.25Z" fill="currentColor"/>
                            <path opacity="0.5" d="M13 2.5V5C13 7.35702 13 8.53553 13.7322 9.26777C14.4645 10 15.643 10 18 10H22" stroke="currentColor" stroke-width="1.5"/>
                            <path opacity="0.5" d="M8.5 18.5L8.5 13.5M8.5 13.5L6.5 15.375M8.5 13.5L10.5 15.375" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        Subir archivo
                    </button>

                    <button type="button" class="btn btn-outline-success flex"  @click="editFolder()">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="mr-1">
                            <path d="M9.5 14C11.1569 14 12.5 15.3431 12.5 17C12.5 18.6568 11.1569 20 9.5 20C7.84315 20 6.5 18.6568 6.5 17C6.5 15.3431 7.84315 14 9.5 14Z" stroke="currentColor" stroke-width="1.5"/>
                            <path d="M14.5 3.99998C12.8431 3.99998 11.5 5.34312 11.5 6.99998C11.5 8.65683 12.8431 9.99998 14.5 9.99998C16.1569 9.99998 17.5 8.65683 17.5 6.99998C17.5 5.34312 16.1569 3.99998 14.5 3.99998Z" stroke="currentColor" stroke-width="1.5"/>
                            <path opacity="0.5" d="M13 17L22 17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                            <path opacity="0.5" d="M11 7L2 6.9585" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                            <path opacity="0.5" d="M2 17L6 17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                            <path opacity="0.5" d="M22 7L18 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                        </svg>
                        Mover
                    </button>

                </div>
            </div>

            <div class="flex flex-col sm:flex-row mb-5 ltr:ml-auto rtl:mr-auto">
                <ol class="flex text-gray-500 font-semibold dark:text-white-dark">
                    <li v-for="(folder, index) in folderHistory" :key="index">
                    <span
                        @click="navigateToFolder(folder.id)"
                        class="text-primary cursor-pointer hover:underline hover:text-blue-500/70 dark:hover:text-white-dark/70 text-xl"
                    >
                        {{ folder.name }}
                    </span>

                    <!-- Añade una flecha separadora, excepto después del último elemento -->
                    <span v-if="index < folderHistory.length - 1" class="mx-2">/</span>
                    </li>
                </ol>
            </div>

            <template v-if="displayType === 'list'">
                <div class="datatable">
                    <vue3-datatable
                        :rows="rows"
                        :columns="cols"
                        :loading="loading"
                        :totalRows="total_rows"
                        :isServerMode="true"
                        :sortable="true"
                        :sortColumn="params.sort_column"
                        :sortDirection="params.sort_direction"
                        :pageSize="params.pagesize"
                        :search="params.search"
                        :hasCheckbox="true"
                        @change="changeServer"
                        @row-click="handleRowClick"
                        skin="whitespace-nowrap bh-table-hover"
                        firstArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M13 19L7 12L13 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path opacity="0.5" d="M16.9998 19L10.9998 12L16.9998 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>'
                        lastArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M11 19L17 12L11 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path opacity="0.5" d="M6.99976 19L12.9998 12L6.99976 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg> '
                        previousArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M15 5L9 12L15 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>'
                        nextArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M9 5L15 12L9 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>'
                    >

                        <template #filename="data">
                            <div class="flex items-center w-max">
                                <div v-show="data.value.is_folder"
                                    class="border border-gray-300 dark:border-gray-800 rounded-full grid place-content-center h-10 w-10 ltr:mr-2 rtl:ml-2">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-5.5 h-5.5 text-yellow-500">
                                        <path opacity="0.5" d="M18 10L13 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                                        <path opacity="0.5" d="M10 3H16.5C16.9644 3 17.1966 3 17.3916 3.02567C18.7378 3.2029 19.7971 4.26222 19.9743 5.60842C20 5.80337 20 6.03558 20 6.5" stroke="currentColor" stroke-width="1.5"/>
                                        <path d="M2 6.94975C2 6.06722 2 5.62595 2.06935 5.25839C2.37464 3.64031 3.64031 2.37464 5.25839 2.06935C5.62595 2 6.06722 2 6.94975 2C7.33642 2 7.52976 2 7.71557 2.01738C8.51665 2.09229 9.27652 2.40704 9.89594 2.92051C10.0396 3.03961 10.1763 3.17633 10.4497 3.44975L11 4C11.8158 4.81578 12.2237 5.22367 12.7121 5.49543C12.9804 5.64471 13.2651 5.7626 13.5604 5.84678C14.0979 6 14.6747 6 15.8284 6H16.2021C18.8345 6 20.1506 6 21.0062 6.76946C21.0849 6.84024 21.1598 6.91514 21.2305 6.99383C22 7.84935 22 9.16554 22 11.7979V14C22 17.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V6.94975Z" stroke="currentColor" stroke-width="1.5"/>
                                    </svg>
                                </div>

                                <div v-show="data.value.is_image"
                                    class="border border-gray-300 dark:border-gray-800 rounded-full grid place-content-center h-8 w-8 ltr:mr-2 rtl:ml-2">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 text-green-500">
                                        <path d="M18 8C18 9.10457 17.1046 10 16 10C14.8954 10 14 9.10457 14 8C14 6.89543 14.8954 6 16 6C17.1046 6 18 6.89543 18 8Z" fill="currentColor"/>
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9426 1.25H12.0574C14.3658 1.24999 16.1748 1.24998 17.5863 1.43975C19.031 1.63399 20.1711 2.03933 21.0659 2.93414C21.9607 3.82895 22.366 4.96897 22.5603 6.41371C22.75 7.82519 22.75 9.63423 22.75 11.9426V12.0309C22.75 13.9397 22.75 15.5023 22.6463 16.7745C22.5422 18.0531 22.3287 19.1214 21.8509 20.0087C21.6401 20.4001 21.3812 20.7506 21.0659 21.0659C20.1711 21.9607 19.031 22.366 17.5863 22.5603C16.1748 22.75 14.3658 22.75 12.0574 22.75H11.9426C9.63423 22.75 7.82519 22.75 6.41371 22.5603C4.96897 22.366 3.82895 21.9607 2.93414 21.0659C2.14086 20.2726 1.7312 19.2852 1.51335 18.0604C1.29935 16.8573 1.2602 15.3603 1.25207 13.5015C1.25 13.0287 1.25 12.5286 1.25 12.001L1.25 11.9426C1.24999 9.63423 1.24998 7.82519 1.43975 6.41371C1.63399 4.96897 2.03933 3.82895 2.93414 2.93414C3.82895 2.03933 4.96897 1.63399 6.41371 1.43975C7.82519 1.24998 9.63423 1.24999 11.9426 1.25ZM6.61358 2.92637C5.33517 3.09825 4.56445 3.42514 3.9948 3.9948C3.42514 4.56445 3.09825 5.33517 2.92637 6.61358C2.75159 7.91356 2.75 9.62177 2.75 12C2.75 12.5287 2.75 13.0257 2.75205 13.4949C2.76025 15.369 2.80214 16.7406 2.99017 17.7978C3.17436 18.8333 3.48774 19.4981 3.9948 20.0052C4.56445 20.5749 5.33517 20.9018 6.61358 21.0736C7.91356 21.2484 9.62177 21.25 12 21.25C14.3782 21.25 16.0864 21.2484 17.3864 21.0736C18.6648 20.9018 19.4355 20.5749 20.0052 20.0052C20.2151 19.7953 20.3872 19.5631 20.5302 19.2976C20.8619 18.6816 21.0531 17.8578 21.1513 16.6527C21.2494 15.4482 21.25 13.9459 21.25 12C21.25 9.62177 21.2484 7.91356 21.0736 6.61358C20.9018 5.33517 20.5749 4.56445 20.0052 3.9948C19.4355 3.42514 18.6648 3.09825 17.3864 2.92637C16.0864 2.75159 14.3782 2.75 12 2.75C9.62177 2.75 7.91356 2.75159 6.61358 2.92637Z" fill="currentColor"/>
                                        <path opacity="0.4" d="M20.6069 19.1463L17.7765 16.599C16.737 15.6634 15.1889 15.5702 14.0446 16.3744L13.7464 16.5839C12.9513 17.1428 11.8695 17.0491 11.1822 16.3618L6.89252 12.0721C6.03631 11.2159 4.66289 11.1702 3.75162 11.9675L2.75049 12.8435C2.75077 13.0665 2.75128 13.2835 2.7522 13.4949C2.7604 15.369 2.80229 16.7406 2.99032 17.7978C3.17451 18.8333 3.48788 19.4981 3.99494 20.0052C4.5646 20.5749 5.33532 20.9018 6.61372 21.0736C7.9137 21.2484 9.62192 21.25 12.0001 21.25C14.3784 21.25 16.0866 21.2484 17.3866 21.0736C18.665 20.9018 19.4357 20.5749 20.0054 20.0052C20.2153 19.7953 20.3873 19.5631 20.5303 19.2976C20.5568 19.2485 20.5823 19.1981 20.6069 19.1463Z" fill="currentColor"/>
                                    </svg>
                                </div>

                                <div v-show="!data.value.is_image && !data.value.is_folder"
                                    class="border border-gray-300 dark:border-gray-800 rounded-full grid place-content-center h-12 w-12 ltr:mr-2 rtl:ml-2">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5">
                                        <g opacity="0.5">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V10C2 6.22876 2 4.34315 3.17157 3.17157C4.34315 2 6.23869 2 10.0298 2C10.6358 2 11.1214 2 11.53 2.01666C11.5166 2.09659 11.5095 2.17813 11.5092 2.26057L11.5 5.09497C11.4999 6.19207 11.4998 7.16164 11.6049 7.94316C11.7188 8.79028 11.9803 9.63726 12.6716 10.3285C13.3628 11.0198 14.2098 11.2813 15.0569 11.3952C15.8385 11.5003 16.808 11.5002 17.9051 11.5001L18 11.5001H21.9574C22 12.0344 22 12.6901 22 13.5629V14C22 17.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22Z" fill="currentColor"/>
                                        </g>
                                        <path d="M6 13.75C5.58579 13.75 5.25 14.0858 5.25 14.5C5.25 14.9142 5.58579 15.25 6 15.25H14C14.4142 15.25 14.75 14.9142 14.75 14.5C14.75 14.0858 14.4142 13.75 14 13.75H6Z" fill="currentColor"/>
                                        <path d="M6 17.25C5.58579 17.25 5.25 17.5858 5.25 18C5.25 18.4142 5.58579 18.75 6 18.75H11.5C11.9142 18.75 12.25 18.4142 12.25 18C12.25 17.5858 11.9142 17.25 11.5 17.25H6Z" fill="currentColor"/>
                                        <path d="M11.5092 2.2601L11.5 5.0945C11.4999 6.1916 11.4998 7.16117 11.6049 7.94269C11.7188 8.78981 11.9803 9.6368 12.6716 10.3281C13.3629 11.0193 14.2098 11.2808 15.057 11.3947C15.8385 11.4998 16.808 11.4997 17.9051 11.4996L21.9574 11.4996C21.9698 11.6552 21.9786 11.821 21.9848 11.9995H22C22 11.732 22 11.5983 21.9901 11.4408C21.9335 10.5463 21.5617 9.52125 21.0315 8.79853C20.9382 8.6713 20.8743 8.59493 20.7467 8.44218C19.9542 7.49359 18.911 6.31193 18 5.49953C17.1892 4.77645 16.0787 3.98536 15.1101 3.3385C14.2781 2.78275 13.862 2.50487 13.2915 2.29834C13.1403 2.24359 12.9408 2.18311 12.7846 2.14466C12.4006 2.05013 12.0268 2.01725 11.5 2.00586L11.5092 2.2601Z" fill="currentColor"/>
                                    </svg>
                                </div>

                                <div class="text-xl">{{ data.value.filename }}</div>

                            </div>
                        </template>

                        <template #actions="data">
                            <div class="flex items-center justify-center gap-3">

                                <button type="button" class="btn btn-sm btn-info" v-tippy:edit v-show="data.value.is_folder" @click="editFolder(data.value)" @click.stop>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5">
                                        <path
                                            d="M15.2869 3.15178L14.3601 4.07866L5.83882 12.5999L5.83881 12.5999C5.26166 13.1771 4.97308 13.4656 4.7249 13.7838C4.43213 14.1592 4.18114 14.5653 3.97634 14.995C3.80273 15.3593 3.67368 15.7465 3.41556 16.5208L2.32181 19.8021L2.05445 20.6042C1.92743 20.9852 2.0266 21.4053 2.31063 21.6894C2.59466 21.9734 3.01478 22.0726 3.39584 21.9456L4.19792 21.6782L7.47918 20.5844L7.47919 20.5844C8.25353 20.3263 8.6407 20.1973 9.00498 20.0237C9.43469 19.8189 9.84082 19.5679 10.2162 19.2751C10.5344 19.0269 10.8229 18.7383 11.4001 18.1612L11.4001 18.1612L19.9213 9.63993L20.8482 8.71306C22.3839 7.17735 22.3839 4.68748 20.8482 3.15178C19.3125 1.61607 16.8226 1.61607 15.2869 3.15178Z"
                                            stroke="currentColor"
                                            stroke-width="1.5"
                                        />
                                        <path
                                            opacity="0.5"
                                            d="M14.36 4.07812C14.36 4.07812 14.4759 6.04774 16.2138 7.78564C17.9517 9.52354 19.9213 9.6394 19.9213 9.6394M4.19789 21.6777L2.32178 19.8015"
                                            stroke="currentColor"
                                            stroke-width="1.5"
                                        />
                                    </svg>
                                </button>
                                <button type="button" class="btn btn-sm btn-info" v-tippy:edit v-show="data.value.is_image || (!data.value.is_image && !data.value.is_folder)" @click="redirectToEdit(data.value.id)" @click.stop>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5">
                                        <path
                                            d="M15.2869 3.15178L14.3601 4.07866L5.83882 12.5999L5.83881 12.5999C5.26166 13.1771 4.97308 13.4656 4.7249 13.7838C4.43213 14.1592 4.18114 14.5653 3.97634 14.995C3.80273 15.3593 3.67368 15.7465 3.41556 16.5208L2.32181 19.8021L2.05445 20.6042C1.92743 20.9852 2.0266 21.4053 2.31063 21.6894C2.59466 21.9734 3.01478 22.0726 3.39584 21.9456L4.19792 21.6782L7.47918 20.5844L7.47919 20.5844C8.25353 20.3263 8.6407 20.1973 9.00498 20.0237C9.43469 19.8189 9.84082 19.5679 10.2162 19.2751C10.5344 19.0269 10.8229 18.7383 11.4001 18.1612L11.4001 18.1612L19.9213 9.63993L20.8482 8.71306C22.3839 7.17735 22.3839 4.68748 20.8482 3.15178C19.3125 1.61607 16.8226 1.61607 15.2869 3.15178Z"
                                            stroke="currentColor"
                                            stroke-width="1.5"
                                        />
                                        <path
                                            opacity="0.5"
                                            d="M14.36 4.07812C14.36 4.07812 14.4759 6.04774 16.2138 7.78564C17.9517 9.52354 19.9213 9.6394 19.9213 9.6394M4.19789 21.6777L2.32178 19.8015"
                                            stroke="currentColor"
                                            stroke-width="1.5"
                                        />
                                    </svg>
                                </button>
                                <tippy target="edit">Editar</tippy>
                                <!-- <template  v-if="userStore.hasAccess('user.users.destroy')"> -->
                                    <button type="button" class="btn btn-sm btn-danger" v-tippy:delete @click="deleteFolder(data.value.id)"  @click.stop>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5">
                                            <path d="M20.5001 6H3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
                                            <path d="M18.8334 8.5L18.3735 15.3991C18.1965 18.054 18.108 19.3815 17.243 20.1907C16.378 21 15.0476 21 12.3868 21H11.6134C8.9526 21 7.6222 21 6.75719 20.1907C5.89218 19.3815 5.80368 18.054 5.62669 15.3991L5.16675 8.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
                                            <path opacity="0.5" d="M9.5 11L10 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
                                            <path opacity="0.5" d="M14.5 11L14 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
                                            <path opacity="0.5" d="M6.5 6C6.55588 6 6.58382 6 6.60915 5.99936C7.43259 5.97849 8.15902 5.45491 8.43922 4.68032C8.44784 4.65649 8.45667 4.62999 8.47434 4.57697L8.57143 4.28571C8.65431 4.03708 8.69575 3.91276 8.75071 3.8072C8.97001 3.38607 9.37574 3.09364 9.84461 3.01877C9.96213 3 10.0932 3 10.3553 3H13.6447C13.9068 3 14.0379 3 14.1554 3.01877C14.6243 3.09364 15.03 3.38607 15.2493 3.8072C15.3043 3.91276 15.3457 4.03708 15.4286 4.28571L15.5257 4.57697C15.5433 4.62992 15.5522 4.65651 15.5608 4.68032C15.841 5.45491 16.5674 5.97849 17.3909 5.99936C17.4162 6 17.4441 6 17.5 6" stroke="currentColor" stroke-width="1.5"></path>
                                        </svg>
                                    </button>
                                    <tippy target="delete">Borrar</tippy>
                                <!-- </template> -->
                            </div>
                        </template>

                    </vue3-datatable>
                </div>
            </template>

            <template v-if="displayType === 'grid'">
                <h2 class="text-dark text-xl dark:text-white-light font-bold">Carpetas</h2>
                <div class="grid 2xl:grid-cols-4 xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 w-full mt-5">
                    <template v-for="app in rows" :key="app.id">
                        <div v-if="app.is_folder" class="bg-white dark:bg-[#1c232f] text-center shadow relative rounded" @click="handleRowClick(app)" >
                            <!-- <div> -->
                                <button
                                    type="button"
                                     class="w-full flex p-2 justify-between items-center hover:bg-white-dark/10 rounded-md dark:hover:text-primary hover:text-primary dark:hover:bg-[#181F32] font-medium group"
                                >
                                    <div class="flex items-center">

                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 shrink-0 ">
                                            <path d="M2 6.94975C2 6.06722 2 5.62595 2.06935 5.25839C2.37464 3.64031 3.64031 2.37464 5.25839 2.06935C5.62595 2 6.06722 2 6.94975 2C7.33642 2 7.52976 2 7.71557 2.01738C8.51665 2.09229 9.27652 2.40704 9.89594 2.92051C10.0396 3.03961 10.1763 3.17633 10.4497 3.44975L11 4C11.8158 4.81578 12.2237 5.22367 12.7121 5.49543C12.9804 5.64471 13.2651 5.7626 13.5604 5.84678C14.0979 6 14.6747 6 15.8284 6H16.2021C18.8345 6 20.1506 6 21.0062 6.76946C21.0849 6.84024 21.1598 6.91514 21.2305 6.99383C22 7.84935 22 9.16554 22 11.7979V14C22 17.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V6.94975Z" fill="currentColor"/>
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M12.25 10C12.25 9.58579 12.5858 9.25 13 9.25H18C18.4142 9.25 18.75 9.58579 18.75 10C18.75 10.4142 18.4142 10.75 18 10.75H13C12.5858 10.75 12.25 10.4142 12.25 10Z" fill="white"/>
                                            <path d="M16.9856 3.02094C16.8321 3 16.6492 3 16.2835 3H12L12.3699 3.38312C13.0359 4.07299 13.2919 4.33051 13.5877 4.50096C13.7594 4.5999 13.9415 4.67804 14.1304 4.73383C14.4559 4.82993 14.8128 4.83538 15.7546 4.83538L16.089 4.83538C17.0914 4.83536 17.8995 4.83535 18.5389 4.91862C18.6984 4.93939 18.8521 4.96582 19 5C18.8144 3.96313 18.0043 3.15985 16.9856 3.02094Z" fill="currentColor"/>
                                        </svg>

                                        <div class="ltr:ml-3 rtl:mr-3">{{ app.filename }}</div>
                                    </div>
                                    <div class="bg-primary-light dark:bg-[#060818] rounded-md py-1 px-2" @click.stop>
                                        <div class="dropdown">
                                            <Popper
                                                placement='bottom-end'
                                                offsetDistance="0"
                                                class="align-middle"
                                            >
                                                <button type="button" class="hover:text-primary flex items-center">
                                                    <svg
                                                        width="24"
                                                        height="24"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        class="w-5 h-5 rotate-90 opacity-70"
                                                    >
                                                        <circle cx="5" cy="12" r="2" stroke="currentColor" stroke-width="1.5" />
                                                        <circle opacity="0.5" cx="12" cy="12" r="2" stroke="currentColor" stroke-width="1.5" />
                                                        <circle cx="19" cy="12" r="2" stroke="currentColor" stroke-width="1.5" />
                                                    </svg>
                                                </button>
                                                <template #content="{ close }">
                                                    <ul @click="close()" class="whitespace-nowrap">
                                                        <li>
                                                            <a href="javascript:;" class="w-full" @click="editFolder(app)">
                                                                <svg
                                                                    width="24"
                                                                    height="24"
                                                                    viewBox="0 0 24 24"
                                                                    fill="none"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    class="w-5 h-5 ltr:mr-2 rtl:ml-2 shrink-0"
                                                                >
                                                                    <path
                                                                        d="M20.082 3.01787L20.1081 3.76741L20.082 3.01787ZM16.5 3.48757L16.2849 2.76907V2.76907L16.5 3.48757ZM13.6738 4.80287L13.2982 4.15375L13.2982 4.15375L13.6738 4.80287ZM3.9824 3.07501L3.93639 3.8236L3.9824 3.07501ZM7 3.48757L7.19136 2.76239V2.76239L7 3.48757ZM10.2823 4.87558L9.93167 5.5386L10.2823 4.87558ZM13.6276 20.0694L13.9804 20.7312L13.6276 20.0694ZM17 18.6335L16.8086 17.9083H16.8086L17 18.6335ZM19.9851 18.2229L20.032 18.9715L19.9851 18.2229ZM10.3724 20.0694L10.0196 20.7312H10.0196L10.3724 20.0694ZM7 18.6335L7.19136 17.9083H7.19136L7 18.6335ZM4.01486 18.2229L3.96804 18.9715H3.96804L4.01486 18.2229ZM2.75 16.1437V4.99792H1.25V16.1437H2.75ZM22.75 16.1437V4.93332H21.25V16.1437H22.75ZM20.0559 2.26832C18.9175 2.30798 17.4296 2.42639 16.2849 2.76907L16.7151 4.20606C17.6643 3.92191 18.9892 3.80639 20.1081 3.76741L20.0559 2.26832ZM16.2849 2.76907C15.2899 3.06696 14.1706 3.6488 13.2982 4.15375L14.0495 5.452C14.9 4.95981 15.8949 4.45161 16.7151 4.20606L16.2849 2.76907ZM3.93639 3.8236C4.90238 3.88297 5.99643 3.99842 6.80864 4.21274L7.19136 2.76239C6.23055 2.50885 5.01517 2.38707 4.02841 2.32642L3.93639 3.8236ZM6.80864 4.21274C7.77076 4.46663 8.95486 5.02208 9.93167 5.5386L10.6328 4.21257C9.63736 3.68618 8.32766 3.06224 7.19136 2.76239L6.80864 4.21274ZM13.9804 20.7312C14.9714 20.2029 16.1988 19.6206 17.1914 19.3587L16.8086 17.9083C15.6383 18.2171 14.2827 18.8702 13.2748 19.4075L13.9804 20.7312ZM17.1914 19.3587C17.9943 19.1468 19.0732 19.0314 20.032 18.9715L19.9383 17.4744C18.9582 17.5357 17.7591 17.6575 16.8086 17.9083L17.1914 19.3587ZM10.7252 19.4075C9.71727 18.8702 8.3617 18.2171 7.19136 17.9083L6.80864 19.3587C7.8012 19.6206 9.0286 20.2029 10.0196 20.7312L10.7252 19.4075ZM7.19136 17.9083C6.24092 17.6575 5.04176 17.5357 4.06168 17.4744L3.96804 18.9715C4.9268 19.0314 6.00566 19.1468 6.80864 19.3587L7.19136 17.9083ZM21.25 16.1437C21.25 16.8295 20.6817 17.4279 19.9383 17.4744L20.032 18.9715C21.5062 18.8793 22.75 17.6799 22.75 16.1437H21.25ZM22.75 4.93332C22.75 3.47001 21.5847 2.21507 20.0559 2.26832L20.1081 3.76741C20.7229 3.746 21.25 4.25173 21.25 4.93332H22.75ZM1.25 16.1437C1.25 17.6799 2.49378 18.8793 3.96804 18.9715L4.06168 17.4744C3.31831 17.4279 2.75 16.8295 2.75 16.1437H1.25ZM13.2748 19.4075C12.4825 19.8299 11.5175 19.8299 10.7252 19.4075L10.0196 20.7312C11.2529 21.3886 12.7471 21.3886 13.9804 20.7312L13.2748 19.4075ZM13.2982 4.15375C12.4801 4.62721 11.4617 4.65083 10.6328 4.21257L9.93167 5.5386C11.2239 6.22189 12.791 6.18037 14.0495 5.452L13.2982 4.15375ZM2.75 4.99792C2.75 4.30074 3.30243 3.78463 3.93639 3.8236L4.02841 2.32642C2.47017 2.23065 1.25 3.49877 1.25 4.99792H2.75Z"
                                                                        fill="currentColor"
                                                                    />
                                                                    <path opacity="0.5" d="M12 5.854V20.9999" stroke="currentColor" stroke-width="1.5" />
                                                                    <path
                                                                        opacity="0.5"
                                                                        d="M5 9L9 10"
                                                                        stroke="currentColor"
                                                                        stroke-width="1.5"
                                                                        stroke-linecap="round"
                                                                    />
                                                                    <path
                                                                        opacity="0.5"
                                                                        d="M19 9L15 10"
                                                                        stroke="currentColor"
                                                                        stroke-width="1.5"
                                                                        stroke-linecap="round"
                                                                    />
                                                                    <path
                                                                        opacity="0.5"
                                                                        d="M5 13L9 14"
                                                                        stroke="currentColor"
                                                                        stroke-width="1.5"
                                                                        stroke-linecap="round"
                                                                    />
                                                                    <path
                                                                        opacity="0.5"
                                                                        d="M19 13L15 14"
                                                                        stroke="currentColor"
                                                                        stroke-width="1.5"
                                                                        stroke-linecap="round"
                                                                    />
                                                                </svg>
                                                                Renombrar
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="javascript:;" class="w-full" @click="deleteFolder(app.id)" @click.stop>
                                                                <svg
                                                                    width="24"
                                                                    height="24"
                                                                    viewBox="0 0 24 24"
                                                                    fill="none"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    class="w-5 h-5 ltr:mr-2 rtl:ml-2 shrink-0"
                                                                >
                                                                    <path
                                                                        opacity="0.5"
                                                                        d="M9.17065 4C9.58249 2.83481 10.6937 2 11.9999 2C13.3062 2 14.4174 2.83481 14.8292 4"
                                                                        stroke="currentColor"
                                                                        stroke-width="1.5"
                                                                        stroke-linecap="round"
                                                                    />
                                                                    <path d="M20.5001 6H3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                                                    <path
                                                                        d="M18.8334 8.5L18.3735 15.3991C18.1965 18.054 18.108 19.3815 17.243 20.1907C16.378 21 15.0476 21 12.3868 21H11.6134C8.9526 21 7.6222 21 6.75719 20.1907C5.89218 19.3815 5.80368 18.054 5.62669 15.3991L5.16675 8.5"
                                                                        stroke="currentColor"
                                                                        stroke-width="1.5"
                                                                        stroke-linecap="round"
                                                                    />
                                                                    <path
                                                                        opacity="0.5"
                                                                        d="M9.5 11L10 16"
                                                                        stroke="currentColor"
                                                                        stroke-width="1.5"
                                                                        stroke-linecap="round"
                                                                    />
                                                                    <path
                                                                        opacity="0.5"
                                                                        d="M14.5 11L14 16"
                                                                        stroke="currentColor"
                                                                        stroke-width="1.5"
                                                                        stroke-linecap="round"
                                                                    />
                                                                </svg>

                                                                Borrar
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </template>
                                            </Popper>
                                        </div>

                                    </div>
                                </button>
                            <!-- </div> -->
                        </div>
                    </template>
                </div>

                <div class="h-px border-b border-[#e0e6ed] dark:border-[#1b2e4b] my-5"></div>

                <h2 class="text-dark text-xl dark:text-white-light font-bold">Archivos</h2>

                <div class="grid 2xl:grid-cols-4 xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 w-full mt-5">
                    <template v-for="app in rows" :key="app.id">
                        <div v-if="app.is_image || (!app.is_image && !app.is_folder)" class="bg-white dark:bg-[#1c232f] rounded-md overflow-hidden text-center shadow relative">
                            <div class="bg-white/40 rounded-t-md bg-[url('/assets/images/notification-bg.png')] bg-center bg-cover p-6 pb-0">
                                <!-- <template v-if="app.is_image"> -->
                                    <img class="object-contain w-4/5 max-h-40 mx-auto" :src="`${'/assets/images/profile-35.png'}`" />
                                <!-- </template> -->
                            </div>
                            <div class="px-6 pb-24 -mt-5 relative">
                                <div class="shadow-md bg-white dark:bg-gray-900 rounded-md px-2 py-4">
                                    <div class="text-xl">{{ app.filename ?? null}}</div>
                                </div>
                                    <div class="mt-6 grid grid-cols-1 gap-4 ltr:text-left rtl:text-right">
                                        <div class="flex items-center">
                                            <div class="flex-none ltr:mr-2 rtl:ml-2">Creado el:</div>
                                            <div class="text-white-dark">{{ app.created_at ?? null }}</div>
                                        </div>
                                    </div>
                            </div>
                            <div class="mt-6 flex gap-4 absolute bottom-0 w-full ltr:left-0 rtl:right-0 p-6">
                                    <!-- <template v-if="userStore.hasAccess('sass.companies.edit')"> -->
                                        <button type="button" class="btn btn-sm btn-info w-1/2" v-tippy:edit v-show="app.is_folder" @click="editFolder(app)" @click.stop>
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5">
                                                <path
                                                    d="M15.2869 3.15178L14.3601 4.07866L5.83882 12.5999L5.83881 12.5999C5.26166 13.1771 4.97308 13.4656 4.7249 13.7838C4.43213 14.1592 4.18114 14.5653 3.97634 14.995C3.80273 15.3593 3.67368 15.7465 3.41556 16.5208L2.32181 19.8021L2.05445 20.6042C1.92743 20.9852 2.0266 21.4053 2.31063 21.6894C2.59466 21.9734 3.01478 22.0726 3.39584 21.9456L4.19792 21.6782L7.47918 20.5844L7.47919 20.5844C8.25353 20.3263 8.6407 20.1973 9.00498 20.0237C9.43469 19.8189 9.84082 19.5679 10.2162 19.2751C10.5344 19.0269 10.8229 18.7383 11.4001 18.1612L11.4001 18.1612L19.9213 9.63993L20.8482 8.71306C22.3839 7.17735 22.3839 4.68748 20.8482 3.15178C19.3125 1.61607 16.8226 1.61607 15.2869 3.15178Z"
                                                    stroke="currentColor"
                                                    stroke-width="1.5"
                                                />
                                                <path
                                                    opacity="0.5"
                                                    d="M14.36 4.07812C14.36 4.07812 14.4759 6.04774 16.2138 7.78564C17.9517 9.52354 19.9213 9.6394 19.9213 9.6394M4.19789 21.6777L2.32178 19.8015"
                                                    stroke="currentColor"
                                                    stroke-width="1.5"
                                                />
                                            </svg>
                                        </button>
                                        <button type="button" class="btn btn-sm btn-info w-1/2" v-tippy:edit v-show="app.is_image || (!app.is_image && !app.is_folder)" @click="redirectToEdit(app.id)" @click.stop>
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5">
                                                <path
                                                    d="M15.2869 3.15178L14.3601 4.07866L5.83882 12.5999L5.83881 12.5999C5.26166 13.1771 4.97308 13.4656 4.7249 13.7838C4.43213 14.1592 4.18114 14.5653 3.97634 14.995C3.80273 15.3593 3.67368 15.7465 3.41556 16.5208L2.32181 19.8021L2.05445 20.6042C1.92743 20.9852 2.0266 21.4053 2.31063 21.6894C2.59466 21.9734 3.01478 22.0726 3.39584 21.9456L4.19792 21.6782L7.47918 20.5844L7.47919 20.5844C8.25353 20.3263 8.6407 20.1973 9.00498 20.0237C9.43469 19.8189 9.84082 19.5679 10.2162 19.2751C10.5344 19.0269 10.8229 18.7383 11.4001 18.1612L11.4001 18.1612L19.9213 9.63993L20.8482 8.71306C22.3839 7.17735 22.3839 4.68748 20.8482 3.15178C19.3125 1.61607 16.8226 1.61607 15.2869 3.15178Z"
                                                    stroke="currentColor"
                                                    stroke-width="1.5"
                                                />
                                                <path
                                                    opacity="0.5"
                                                    d="M14.36 4.07812C14.36 4.07812 14.4759 6.04774 16.2138 7.78564C17.9517 9.52354 19.9213 9.6394 19.9213 9.6394M4.19789 21.6777L2.32178 19.8015"
                                                    stroke="currentColor"
                                                    stroke-width="1.5"
                                                />
                                            </svg>
                                        </button>
                                        <tippy target="edit">Editar</tippy>
                                    <!-- </template> -->

                                    <!-- <template v-if="userStore.hasAccess('sass.companies.destroy')"> -->
                                        <button type="button" class="btn btn-outline-danger w-1/2" v-tippy:delete @click="deleteFolder(app.id)">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5">
                                                <path d="M20.5001 6H3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
                                                <path d="M18.8334 8.5L18.3735 15.3991C18.1965 18.054 18.108 19.3815 17.243 20.1907C16.378 21 15.0476 21 12.3868 21H11.6134C8.9526 21 7.6222 21 6.75719 20.1907C5.89218 19.3815 5.80368 18.054 5.62669 15.3991L5.16675 8.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
                                                <path opacity="0.5" d="M9.5 11L10 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
                                                <path opacity="0.5" d="M14.5 11L14 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
                                                <path opacity="0.5" d="M6.5 6C6.55588 6 6.58382 6 6.60915 5.99936C7.43259 5.97849 8.15902 5.45491 8.43922 4.68032C8.44784 4.65649 8.45667 4.62999 8.47434 4.57697L8.57143 4.28571C8.65431 4.03708 8.69575 3.91276 8.75071 3.8072C8.97001 3.38607 9.37574 3.09364 9.84461 3.01877C9.96213 3 10.0932 3 10.3553 3H13.6447C13.9068 3 14.0379 3 14.1554 3.01877C14.6243 3.09364 15.03 3.38607 15.2493 3.8072C15.3043 3.91276 15.3457 4.03708 15.4286 4.28571L15.5257 4.57697C15.5433 4.62992 15.5522 4.65651 15.5608 4.68032C15.841 5.45491 16.5674 5.97849 17.3909 5.99936C17.4162 6 17.4441 6 17.5 6" stroke="currentColor" stroke-width="1.5"></path>
                                            </svg>
                                        </button>
                                        <tippy target="delete">Borrar</tippy>
                                    <!-- </template> -->
                            </div>
                        </div>
                    </template>
                </div>

            </template>

        </div>

        <TransitionRoot appear :show="addFolderModal" as="template">
            <Dialog as="div" @close="addFolderModal = false" class="relative z-[51]">
                <TransitionChild
                    as="template"
                    enter="duration-300 ease-out"
                    enter-from="opacity-0"
                    enter-to="opacity-100"
                    leave="duration-200 ease-in"
                    leave-from="opacity-100"
                    leave-to="opacity-0"
                >
                    <DialogOverlay class="fixed inset-0 bg-[black]/60" />
                </TransitionChild>

                <div class="fixed inset-0 overflow-y-auto">
                    <div class="flex min-h-full items-start justify-center px-4 py-8">
                        <TransitionChild
                            as="template"
                            enter="duration-300 ease-out"
                            enter-from="opacity-0 scale-95"
                            enter-to="opacity-100 scale-100"
                            leave="duration-200 ease-in"
                            leave-from="opacity-100 scale-100"
                            leave-to="opacity-0 scale-95"
                        >
                            <DialogPanel class="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg text-black dark:text-white-dark">
                                <button
                                    type="button"
                                    class="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none"
                                    @click="addFolderModal = false"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24px"
                                        height="24px"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="1.5"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        class="w-6 h-6"
                                    >
                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                    </svg>
                                </button>
                                <div
                                    class="text-lg font-bold bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]"
                                >
                                    {{ media.id ? 'Editar Aplicación' : 'Agregar Aplicación' }}
                                </div>
                                <div class="p-5">
                                    <form @submit.prevent="saveFolder">
                                        <div class="mb-5">
                                            <label for="filename">Nombre *</label>
                                            <input id="filename" type="text" placeholder="Enter Name" class="form-input" v-model="media.filename" required />
                                        </div>

                                        <div class="flex justify-end items-center mt-8 gap-3">
                                            <button type="submit" class="btn btn-primary ltr:ml-4 rtl:mr-4">
                                                {{ media.id ? 'Actualizar' : 'Agregar' }}
                                            </button>
                                            <button type="button" class="btn btn-outline-danger" @click="addFolderModal = false">Cancelar</button>
                                        </div>
                                    </form>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </TransitionRoot>
    </div>

  </template>

  <script lang="ts" setup>
    import { ref, onMounted, reactive } from 'vue';
    import Vue3Datatable from '@bhplugin/vue3-datatable';
    import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogOverlay, Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';
    import 'vue3-quill/lib/vue3-quill.css';

    import { API } from '@/services/api';
    import { NOTIFY } from '@/services/notify';
    import { useMeta } from '@/composables/use-meta';
    import { useRouter } from 'vue-router';
    const api = new API();
    const notify = new NOTIFY();
    const files = ref([]);
    const loading = ref(false);
    let timer: any;
    const ids = ref<number[]>([]);

    useMeta({ title: 'Media' });

    const displayType = ref('list');
    const router = useRouter();

    // Historial de carpetas para la navegación breadcrumb
    const folderHistory = ref([{ id: 0, name: 'Home' }]);

    const redirectToCreate = () => {
        router.push({ name: 'media-create' });
    };

    const redirectToEdit = (id: number) => {
        router.push({ name: 'media-edit', params: { id } });
    };

    const cols = ref([
        { field: 'id', title: 'ID', isUnique: true, type: 'number', sort: false, width:'50px' },
        { field: 'filename', title: 'Nombre del archivo' },
        { field: 'created_at', title: 'Fecha de creación', type:'date', headerClass: 'justify-center', width:'160px' },
        { field: 'actions', title: 'Actions', sort: false, headerClass: 'justify-center', width:'100px'  },
    ]);

    // Función que se ejecuta al hacer clic en una fila
    const handleRowClick = (data: any) => {
        if (data.is_folder){
            params.folder_id = data.id;
            getData();
            getFolder();
        }
        else {
            console.log('Is other', data.id);
        }
    };

    const navigateToFolder = (folder_id) => {
        if (folder_id==0){
            params.folder_id = 0;
            folderHistory.value = [{ id: 0, name: 'Home' }];
        }else
        {
            params.folder_id = folder_id;
            getFolder();
        }
        getData();
    };

    const folderParams = ref(
        {
            id: null,
            name: null,
            folder_id: 0
        }
    );
    const addFolderModal = ref(false);
    const media = ref(JSON.parse(JSON.stringify(folderParams.value)));

    const editFolder = (folderData: any = null) => {

        media.value = JSON.parse(JSON.stringify(folderParams.value));
        if (folderData) {
            media.value = JSON.parse(JSON.stringify(folderData));
        }
        addFolderModal.value = true;
    };

    const saveFolder = async () => {
        let application = {
            id: media.value.id,
            name: media.value.filename,
            parent_id: params.folder_id.toString()
        };

        if (media.value.id) {
            //update folderData
            console.log("estoy editando");

            try {
                loading.value = true;
                api.post(`folder/${media.value.id}`, application);
            } catch (error) {
                console.error('Error fetching data', error);
            } finally {
                getData();
                loading.value = false;
            }
        } else {
            //add folderData
            try {
                loading.value = true;
                api.post(`folder`, application);
                getData();
            } catch (error) {
                console.error('Error fetching data', error);
            } finally {
                loading.value = false;
            }
        }
        notify.showToast('Registro guardado exitosamente!', 'success');
        addFolderModal.value = false;
    };

    const rows = ref<Record<string, unknown>[]>([]);
    const total_rows = ref(0);

    const params = reactive({
        current_page: 1,
        pagesize: 10,
        column_filters: [],
        sort_column: 'created_at',
        sort_direction: 'ascending',
        search: null,
        folder_id:0
    });

    async function getData() {
        try {
            const response = await api.get(`media/all-vue?folder_id=${params.folder_id}&search=${params.search??''}&page=${params.current_page}&per_page=${params.pagesize}&order_by=${params.sort_column}&order=${params.sort_direction}`);
            rows.value = response?.data;
            total_rows.value = response?.meta?.total;
        } catch (error) {
            console.error('Error fetching data', error);
        }
    }

    // Función para obtener los detalles de la carpeta actual y actualizar la navegación
    const getFolder = async () => {
        try {
            const response = await api.get(`folder/breadcrumb/${params.folder_id}`);
            folderHistory.value = response;
        } catch (error) {
            console.error('Error fetching folder', error);
        }
    };

    const changeServer = (data: any) => {
        params.current_page = data.current_page;
        params.pagesize = data.pagesize;
        params.sort_column = data.sort_column;
        params.sort_direction = data.sort_direction;
        params.folder_id = data.id;
        if (data.change_type === 'search') {
            clearTimeout(timer);
            timer = setTimeout(() => {
                getData();
            }, 500);
        } else {
            getData();
        }
    };

    const clearSearch = () => {
        params.search = null;
        clearTimeout(timer);
    };

    const deleteFolder = (id: number) => {
        notify.showConfirm(
            '¿Estás seguro?',
            'Esta acción no se puede deshacer',
            'warning',
            'Sí, eliminar',
            'Cancelar'
            ).then(isConfirmed => {
            if (isConfirmed) {
                api.delete(`folder/${id}`)
                .then(async response => {
                    await getData();
                    notify.showToast('Registro eliminado exitosamente!', 'success');
                })
                .catch(error => {
                    notify.showToast('Hubo un problema al eliminar el registro.', 'error');
                });
            }
        });
    };

    onMounted(async () => {
        await getData();
    });
  </script>
