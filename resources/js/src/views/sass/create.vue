<template>
    <div>
        <ul class="flex space-x-2 rtl:space-x-reverse">
            <li>
                <router-link to="/companies" class="text-primary hover:underline">
                    Companies
                </router-link>
            </li>
            <li class="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                <span>Edit</span>
            </li>
        </ul>

        <div class="pt-5">
            <TabGroup>
                <TabList
                    class="flex font-semibold border-b border-[#ebedf2] dark:border-[#191e3a] mb-5 whitespace-nowrap overflow-y-auto">
                    <Tab as="template" v-slot="{ selected }">
                        <a href="javascript:;"
                            class="flex gap-2 p-4 border-b border-transparent hover:border-primary hover:text-primary !outline-none"
                            :class="{ '!border-primary text-primary': selected }">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg" class="w-5 h-5">
                                <path opacity="0.5"
                                    d="M2 12.2039C2 9.91549 2 8.77128 2.5192 7.82274C3.0384 6.87421 3.98695 6.28551 5.88403 5.10813L7.88403 3.86687C9.88939 2.62229 10.8921 2 12 2C13.1079 2 14.1106 2.62229 16.116 3.86687L18.116 5.10812C20.0131 6.28551 20.9616 6.87421 21.4808 7.82274C22 8.77128 22 9.91549 22 12.2039V13.725C22 17.6258 22 19.5763 20.8284 20.7881C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.7881C2 19.5763 2 17.6258 2 13.725V12.2039Z"
                                    stroke="currentColor" stroke-width="1.5" />
                                <path d="M12 15L12 18" stroke="currentColor" stroke-width="1.5"
                                    stroke-linecap="round" />
                            </svg>
                            Home
                        </a>
                    </Tab>

                    <Tab as="template" v-slot="{ selected }">
                        <a href="javascript:;"
                            class="flex gap-2 p-4 border-b border-transparent hover:border-primary hover:text-primary !outline-none"
                            :class="{ '!border-primary text-primary': selected }">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg" class="w-5 h-5">
                                <circle opacity="0.5" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5" />
                                <path d="M12 6V18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                <path
                                    d="M15 9.5C15 8.11929 13.6569 7 12 7C10.3431 7 9 8.11929 9 9.5C9 10.8807 10.3431 12 12 12C13.6569 12 15 13.1193 15 14.5C15 15.8807 13.6569 17 12 17C10.3431 17 9 15.8807 9 14.5"
                                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                            </svg>
                            API Configurations
                        </a>
                    </Tab>

                </TabList>
                <TabPanels>

                    <form @submit.prevent="createCompany">
                        <TabPanel>
                            <div>
                                <div class="panel pb-1.5 mt-6">
                                    <div
                                        class="border border-[#ebedf2] dark:border-[#191e3a] rounded-md p-4 mb-2 bg-white dark:bg-[#0e1726]">
                                        <h6 class="text-lg font-bold mb-5">General Information</h6>
                                        <div class="flex flex-col sm:flex-row">
                                            <div class="ltr:sm:mr-4 rtl:sm:ml-4 w-full sm:w-2/12 mb-5">
                                                <img src="/assets//images/profile-34.jpeg" alt=""
                                                    class="w-20 h-20 md:w-32 md:h-32 rounded-full object-cover mx-auto" />
                                            </div>
                                            <div class="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5">
                                                <div>
                                                    <label for="name">Name *</label>
                                                    <input id="name" type="text" placeholder="Company Name" v-model="companyData.name"
                                                        class="form-input" required />
                                                </div>
                                                <div>
                                                    <label for="identification">Identification *</label>
                                                    <input id="identification" type="text" placeholder="Company identification" v-model="companyData.identification"
                                                        class="form-input" required />
                                                </div>
                                                <div>
                                                    <label for="address">Address *</label>
                                                    <input id="address" type="text" placeholder="Company Address" v-model="companyData.address"
                                                        class="form-input" required />
                                                </div>
                                                <div>
                                                    <label for="phone">Phone *</label>
                                                    <input id="phone" type="text" placeholder="+57 300 912-2995" v-model="companyData.phone"
                                                        class="form-input" required />
                                                </div>
                                                <div>
                                                    <label for="email">Email *</label>
                                                    <input id="email" type="email" placeholder="info@ejesatelital.com" v-model="companyData.email"
                                                        class="form-input" required />
                                                </div>
                                                <div>
                                                    <label for="web">Website</label>
                                                    <input id="web" type="text"
                                                        placeholder="https://www.ejesatelital.com/" class="form-input" v-model="companyData.web" />
                                                </div>
                                            </div>
                                        </div>

                                    <!-- <div class="mb-5">
                                        <div class="custom-file-container" data-upload-id="myFirstImage">
                                            <div class="label-container">
                                                <label>Logo </label> <a href="javascript:;" class="custom-file-container__image-clear" title="Clear Image">×</a>
                                            </div>
                                            <label class="custom-file-container__custom-file">
                                                <input type="file" class="custom-file-container__custom-file__custom-file-input" accept="image/*" />
                                                <input type="hidden" name="MAX_FILE_SIZE" value="10485760" />
                                                <span class="custom-file-container__custom-file__custom-file-control ltr:pr-20 rtl:pl-20"></span>
                                            </label>
                                            <div class="custom-file-container__image-preview"></div>
                                        </div>
                                    </div> -->
                                    </div>
                                </div>
                            </div>
                        </TabPanel>

                        <TabPanel>
                            <div>
                                <!-- Apis Configurations -->
                                <div class="panel mb-5">
                                    <div class="flex items-center justify-between mb-5">
                                        <h5 class="font-semibold text-lg dark:text-white-light">Apis Configurations</h5>
                                    </div>
                                    <div class="mb-5">
                                        <div class="space-y-2 font-semibold">
                                            <!-- Configuration API eje satelital -->
                                            <div class="border border-[#d3d3d3] dark:border-[#1b2e4b] rounded">
                                                <button type="button"
                                                    class="p-4 w-full flex items-center text-white-dark dark:bg-[#1b2e4b]"
                                                    :class="{ '!text-primary': accordians === 1 }"
                                                    @click="accordians === 1 ? (accordians = null) : (accordians = 1)">
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        class="w-5 h-5 ltr:mr-2 rtl:ml-2 text-primary shrink-0">
                                                        <path opacity="0.5"
                                                            d="M7.142 18.9706C5.18539 18.8995 3.99998 18.6568 3.17157 17.8284C2 16.6569 2 14.7712 2 11C2 7.22876 2 5.34315 3.17157 4.17157C4.34315 3 6.22876 3 10 3H14C17.7712 3 19.6569 3 20.8284 4.17157C22 5.34315 22 7.22876 22 11C22 14.7712 22 16.6569 20.8284 17.8284C20.0203 18.6366 18.8723 18.8873 17 18.965"
                                                            stroke="currentColor" stroke-width="1.5"
                                                            stroke-linecap="round" />
                                                        <path
                                                            d="M9.94955 16.0503C10.8806 15.1192 11.3461 14.6537 11.9209 14.6234C11.9735 14.6206 12.0261 14.6206 12.0787 14.6234C12.6535 14.6537 13.119 15.1192 14.0501 16.0503C16.0759 18.0761 17.0888 19.089 16.8053 19.963C16.7809 20.0381 16.7506 20.1112 16.7147 20.1815C16.2973 21 14.8648 21 11.9998 21C9.13482 21 7.70233 21 7.28489 20.1815C7.249 20.1112 7.21873 20.0381 7.19436 19.963C6.91078 19.089 7.92371 18.0761 9.94955 16.0503Z"
                                                            stroke="currentColor" stroke-width="1.5" />
                                                    </svg>

                                                    Configuration Api Eje Satelital
                                                    <div class="ltr:ml-auto rtl:mr-auto"
                                                        :class="{ 'rotate-180': accordians === 1 }">
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg" class="w-4 h-4">
                                                            <path d="M19 9L12 15L5 9" stroke="currentColor"
                                                                stroke-width="1.5" stroke-linecap="round"
                                                                stroke-linejoin="round" />
                                                        </svg>
                                                    </div>
                                                </button>
                                                <vue-collapsible :isOpen="accordians === 1">
                                                    <div
                                                        class="space-y-2 p-4 text-white-dark text-[13px] border-t border-[#d3d3d3] dark:border-[#1b2e4b]">

                                                        <div class="space-y-5">
                                                            <div class="mb-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                                <div>
                                                                    <label for="user_tracking">User</label>
                                                                    <input id="user_tracking" type="text" placeholder="Enter User" class="form-input" v-model="companyData.settings.user_tracking"/>
                                                                </div>
                                                                <div>
                                                                    <label for="password_tracking">Pass</label>
                                                                    <div class="flex">
                                                                        <input id="password_tracking" type="password"
                                                                            placeholder="Enter Password"
                                                                            class="form-input ltr:rounded-r-none rtl:rounded-l-none" v-model="companyData.settings.password_tracking"/>
                                                                        <div
                                                                            class="bg-[#eee] flex justify-center items-center ltr:rounded-r-md rtl:rounded-l-md px-3 font-semibold border ltr:border-l-0 rtl:border-r-0 border-[#e0e6ed] dark:border-[#17263c] dark:bg-[#1b2e4b]">
                                                                            <label
                                                                                class="w-7 h-4 relative cursor-pointer mb-0">
                                                                                <input type="checkbox"
                                                                                    class="peer absolute w-full h-full opacity-0 z-10 focus:ring-0 focus:outline-none cursor-pointer"
                                                                                    id="password_tracking_check" />
                                                                                <span
                                                                                    class="rounded-full border border-[#adb5bd] bg-white peer-checked:bg-primary peer-checked:border-primary dark:bg-dark block h-full before:absolute ltr:before:left-0.5 rtl:before:right-0.5 ltr:peer-checked:before:left-3.5 rtl:peer-checked:before:right-3.5 peer-checked:before:bg-white before:bg-[#adb5bd] dark:before:bg-white-dark before:bottom-[2px] before:w-3 before:h-3 before:rounded-full before:transition-all before:duration-300"></span>
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <button type="button" class="btn btn-primary mb-5">Generate
                                                                Token</button>
                                                            <div class="mb-5">
                                                                <label for="user_api_hash">API ID</label>
                                                                <div class="flex">
                                                                    <input id="user_api_hash" type="password"
                                                                        placeholder="Enter Password"
                                                                        class="form-input ltr:rounded-r-none rtl:rounded-l-none"  v-model="companyData.settings.user_api_hash"/>
                                                                    <div
                                                                        class="bg-[#eee] flex justify-center items-center ltr:rounded-r-md rtl:rounded-l-md px-3 font-semibold border ltr:border-l-0 rtl:border-r-0 border-[#e0e6ed] dark:border-[#17263c] dark:bg-[#1b2e4b]">
                                                                        <label
                                                                            class="w-7 h-4 relative cursor-pointer mb-0">
                                                                            <input type="checkbox"
                                                                                class="peer absolute w-full h-full opacity-0 z-10 focus:ring-0 focus:outline-none cursor-pointer"
                                                                                id="user_api_hash_check" />
                                                                            <span
                                                                                class="rounded-full border border-[#adb5bd] bg-white peer-checked:bg-primary peer-checked:border-primary dark:bg-dark block h-full before:absolute ltr:before:left-0.5 rtl:before:right-0.5 ltr:peer-checked:before:left-3.5 rtl:peer-checked:before:right-3.5 peer-checked:before:bg-white before:bg-[#adb5bd] dark:before:bg-white-dark before:bottom-[2px] before:w-3 before:h-3 before:rounded-full before:transition-all before:duration-300"></span>
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </vue-collapsible>
                                            </div>
                                            <!-- Configuration Api Email -->
                                            <div class="border border-[#d3d3d3] dark:border-[#1b2e4b] rounded">
                                                <button type="button"
                                                    class="p-4 w-full flex items-center text-white-dark dark:bg-[#1b2e4b]"
                                                    :class="{ '!text-primary': accordians === 2 }"
                                                    @click="accordians === 2 ? (accordians = null) : (accordians = 2)">
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        class="w-5 h-5 ltr:mr-2 rtl:ml-2 text-primary shrink-0">
                                                        <path
                                                            d="M15.5777 3.38197L17.5777 4.43152C19.7294 5.56066 20.8052 6.12523 21.4026 7.13974C22 8.15425 22 9.41667 22 11.9415V12.0585C22 14.5833 22 15.8458 21.4026 16.8603C20.8052 17.8748 19.7294 18.4393 17.5777 19.5685L15.5777 20.618C13.8221 21.5393 12.9443 22 12 22C11.0557 22 10.1779 21.5393 8.42229 20.618L6.42229 19.5685C4.27063 18.4393 3.19479 17.8748 2.5974 16.8603C2 15.8458 2 14.5833 2 12.0585V11.9415C2 9.41667 2 8.15425 2.5974 7.13974C3.19479 6.12523 4.27063 5.56066 6.42229 4.43152L8.42229 3.38197C10.1779 2.46066 11.0557 2 12 2C12.9443 2 13.8221 2.46066 15.5777 3.38197Z"
                                                            stroke="currentColor" stroke-width="1.5"
                                                            stroke-linecap="round" />
                                                        <path opacity="0.5" d="M21 7.5L12 12M12 12L3 7.5M12 12V21.5"
                                                            stroke="currentColor" stroke-width="1.5"
                                                            stroke-linecap="round" />
                                                    </svg>

                                                    Configuration Email
                                                    <div class="ltr:ml-auto rtl:mr-auto"
                                                        :class="{ 'rotate-180': accordians === 2 }">
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg" class="w-4 h-4">
                                                            <path d="M19 9L12 15L5 9" stroke="currentColor"
                                                                stroke-width="1.5" stroke-linecap="round"
                                                                stroke-linejoin="round" />
                                                        </svg>
                                                    </div>
                                                </button>
                                                <vue-collapsible :isOpen="accordians === 2">
                                                    <div
                                                        class="p-4 text-[13px] border-t border-[#d3d3d3] dark:border-[#1b2e4b]">

                                                        <div class="space-y-5">
                                                            <div
                                                                class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                                                <div class="md:col-span-2">
                                                                    <label for="email_host">Server</label>
                                                                    <input id="email_host" type="text" placeholder="Enter Server Email" class="form-input" v-model="companyData.settings.email_host"/>
                                                                </div>
                                                                <div>
                                                                    <label for="email_port">Port</label>
                                                                    <input id="email_port" type="number" placeholder="Enter Port Email" class="form-input" v-model="companyData.settings.email_port"/>
                                                                </div>
                                                                <div>
                                                                    <label for="email_encryption">Encriptation</label>
                                                                    <select id="email_encryption"
                                                                        class="form-select text-white-dark" v-model="companyData.settings.email_encryption">
                                                                        <option>Choose...</option>
                                                                        <option value="TLS">TLS</option>
                                                                        <option value="SSL">SSL</option>
                                                                    </select>
                                                                </div>
                                                            </div>

                                                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                                <div>
                                                                    <label for="email_username">Email</label>
                                                                    <input id="email_username" type="email" placeholder="Enter Email" class="form-input" v-model="companyData.settings.email_username"/>
                                                                </div>
                                                                <div>
                                                                    <label for="email_password">Password</label>
                                                                    <input id="email_password" type="Password" placeholder="Enter Password" class="form-input" v-model="companyData.settings.email_password"/>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <label for="email_from_address">Sender's Email</label>
                                                                <input id="email_from_address" type="email" placeholder="Sender's Email" class="form-input" v-model="companyData.settings.email_from_address"/>
                                                            </div>
                                                            <div>
                                                                <label for="email_from_name">Sender Name</label>
                                                                <input id="email_from_name" type="text" placeholder="Sender Name" class="form-input" v-model="companyData.settings.email_from_name"/>
                                                            </div>
                                                            <div>
                                                                <label for="email_subject">Affair</label>
                                                                <input id="email_subject" type="text" placeholder="Affair" class="form-input" v-model="companyData.settings.email_subject"/>
                                                            </div>
                                                            <div>
                                                                <label for="email_message">Comment</label>
                                                                <textarea rows="3" wrap="soft" class="form-textarea" x-model="email_message" id="email_message" v-model="companyData.settings.email_message"></textarea>
                                                            </div>

                                                        </div>

                                                    </div>
                                                </vue-collapsible>
                                            </div>
                                            <!-- Configuration Api WhatsApp -->
                                            <div class="border border-[#d3d3d3] dark:border-[#1b2e4b] rounded">
                                                <button type="button"
                                                    class="p-4 w-full flex items-center text-white-dark dark:bg-[#1b2e4b]"
                                                    :class="{ '!text-primary': accordians === 3 }"
                                                    @click="accordians === 3 ? (accordians = null) : (accordians = 3)">
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        class="w-5 h-5 ltr:mr-2 rtl:ml-2 text-primary shrink-0">
                                                        <path
                                                            d="M13.0867 21.3877L13.7321 21.7697L13.0867 21.3877ZM13.6288 20.4718L12.9833 20.0898L13.6288 20.4718ZM10.3712 20.4718L9.72579 20.8539H9.72579L10.3712 20.4718ZM10.9133 21.3877L11.5587 21.0057L10.9133 21.3877ZM2.3806 15.9134L3.07351 15.6264V15.6264L2.3806 15.9134ZM7.78958 18.9915L7.77666 19.7413L7.78958 18.9915ZM5.08658 18.6194L4.79957 19.3123H4.79957L5.08658 18.6194ZM21.6194 15.9134L22.3123 16.2004V16.2004L21.6194 15.9134ZM16.2104 18.9915L16.1975 18.2416L16.2104 18.9915ZM18.9134 18.6194L19.2004 19.3123H19.2004L18.9134 18.6194ZM19.6125 2.7368L19.2206 3.37628L19.6125 2.7368ZM21.2632 4.38751L21.9027 3.99563V3.99563L21.2632 4.38751ZM4.38751 2.7368L3.99563 2.09732V2.09732L4.38751 2.7368ZM2.7368 4.38751L2.09732 3.99563H2.09732L2.7368 4.38751ZM9.40279 19.2098L9.77986 18.5615L9.77986 18.5615L9.40279 19.2098ZM13.7321 21.7697L14.2742 20.8539L12.9833 20.0898L12.4412 21.0057L13.7321 21.7697ZM9.72579 20.8539L10.2679 21.7697L11.5587 21.0057L11.0166 20.0898L9.72579 20.8539ZM12.4412 21.0057C12.2485 21.3313 11.7515 21.3313 11.5587 21.0057L10.2679 21.7697C11.0415 23.0767 12.9585 23.0767 13.7321 21.7697L12.4412 21.0057ZM10.5 2.75H13.5V1.25H10.5V2.75ZM21.25 10.5V11.5H22.75V10.5H21.25ZM2.75 11.5V10.5H1.25V11.5H2.75ZM1.25 11.5C1.25 12.6546 1.24959 13.5581 1.29931 14.2868C1.3495 15.0223 1.45323 15.6344 1.68769 16.2004L3.07351 15.6264C2.92737 15.2736 2.84081 14.8438 2.79584 14.1847C2.75041 13.5189 2.75 12.6751 2.75 11.5H1.25ZM7.8025 18.2416C6.54706 18.2199 5.88923 18.1401 5.37359 17.9265L4.79957 19.3123C5.60454 19.6457 6.52138 19.7197 7.77666 19.7413L7.8025 18.2416ZM1.68769 16.2004C2.27128 17.6093 3.39066 18.7287 4.79957 19.3123L5.3736 17.9265C4.33223 17.4951 3.50486 16.6678 3.07351 15.6264L1.68769 16.2004ZM21.25 11.5C21.25 12.6751 21.2496 13.5189 21.2042 14.1847C21.1592 14.8438 21.0726 15.2736 20.9265 15.6264L22.3123 16.2004C22.5468 15.6344 22.6505 15.0223 22.7007 14.2868C22.7504 13.5581 22.75 12.6546 22.75 11.5H21.25ZM16.2233 19.7413C17.4786 19.7197 18.3955 19.6457 19.2004 19.3123L18.6264 17.9265C18.1108 18.1401 17.4529 18.2199 16.1975 18.2416L16.2233 19.7413ZM20.9265 15.6264C20.4951 16.6678 19.6678 17.4951 18.6264 17.9265L19.2004 19.3123C20.6093 18.7287 21.7287 17.6093 22.3123 16.2004L20.9265 15.6264ZM13.5 2.75C15.1512 2.75 16.337 2.75079 17.2619 2.83873C18.1757 2.92561 18.7571 3.09223 19.2206 3.37628L20.0044 2.09732C19.2655 1.64457 18.4274 1.44279 17.4039 1.34547C16.3915 1.24921 15.1222 1.25 13.5 1.25V2.75ZM22.75 10.5C22.75 8.87781 22.7508 7.6085 22.6545 6.59611C22.5572 5.57256 22.3554 4.73445 21.9027 3.99563L20.6237 4.77938C20.9078 5.24291 21.0744 5.82434 21.1613 6.73809C21.2492 7.663 21.25 8.84876 21.25 10.5H22.75ZM19.2206 3.37628C19.7925 3.72672 20.2733 4.20752 20.6237 4.77938L21.9027 3.99563C21.4286 3.22194 20.7781 2.57144 20.0044 2.09732L19.2206 3.37628ZM10.5 1.25C8.87781 1.25 7.6085 1.24921 6.59611 1.34547C5.57256 1.44279 4.73445 1.64457 3.99563 2.09732L4.77938 3.37628C5.24291 3.09223 5.82434 2.92561 6.73809 2.83873C7.663 2.75079 8.84876 2.75 10.5 2.75V1.25ZM2.75 10.5C2.75 8.84876 2.75079 7.663 2.83873 6.73809C2.92561 5.82434 3.09223 5.24291 3.37628 4.77938L2.09732 3.99563C1.64457 4.73445 1.44279 5.57256 1.34547 6.59611C1.24921 7.6085 1.25 8.87781 1.25 10.5H2.75ZM3.99563 2.09732C3.22194 2.57144 2.57144 3.22194 2.09732 3.99563L3.37628 4.77938C3.72672 4.20752 4.20752 3.72672 4.77938 3.37628L3.99563 2.09732ZM11.0166 20.0898C10.8136 19.7468 10.6354 19.4441 10.4621 19.2063C10.2795 18.9559 10.0702 18.7304 9.77986 18.5615L9.02572 19.8582C9.07313 19.8857 9.13772 19.936 9.24985 20.0898C9.37122 20.2564 9.50835 20.4865 9.72579 20.8539L11.0166 20.0898ZM7.77666 19.7413C8.21575 19.7489 8.49387 19.7545 8.70588 19.7779C8.90399 19.7999 8.98078 19.832 9.02572 19.8582L9.77986 18.5615C9.4871 18.3912 9.18246 18.3215 8.87097 18.287C8.57339 18.2541 8.21375 18.2487 7.8025 18.2416L7.77666 19.7413ZM14.2742 20.8539C14.4916 20.4865 14.6287 20.2564 14.7501 20.0898C14.8622 19.936 14.9268 19.8857 14.9742 19.8582L14.2201 18.5615C13.9298 18.7304 13.7204 18.9559 13.5379 19.2063C13.3646 19.4441 13.1864 19.7468 12.9833 20.0898L14.2742 20.8539ZM16.1975 18.2416C15.7862 18.2487 15.4266 18.2541 15.129 18.287C14.8175 18.3215 14.5129 18.3912 14.2201 18.5615L14.9742 19.8582C15.0192 19.832 15.096 19.7999 15.2941 19.7779C15.5061 19.7545 15.7842 19.7489 16.2233 19.7413L16.1975 18.2416Z"
                                                            fill="currentColor" />
                                                        <path d="M8 9H16" stroke="currentColor" stroke-width="1.5"
                                                            stroke-linecap="round" />
                                                        <path d="M8 12.5H13.5" stroke="currentColor" stroke-width="1.5"
                                                            stroke-linecap="round" />
                                                    </svg>

                                                    Configuration WhatsApp
                                                    <div class="ltr:ml-auto rtl:mr-auto"
                                                        :class="{ 'rotate-180': accordians === 3 }">
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg" class="w-4 h-4">
                                                            <path d="M19 9L12 15L5 9" stroke="currentColor"
                                                                stroke-width="1.5" stroke-linecap="round"
                                                                stroke-linejoin="round" />
                                                        </svg>
                                                    </div>
                                                </button>
                                                <vue-collapsible :isOpen="accordians === 3">
                                                    <div
                                                        class="p-4 text-[13px] border-t border-[#d3d3d3] dark:border-[#1b2e4b]">
                                                        <div class="space-y-5">
                                                            <div>
                                                                <label for="whatsapp_token">WhatsApp Token</label>
                                                                <input id="whatsapp_token" type="text" placeholder="Sender Name" class="form-input" v-model="companyData.settings.whatsapp_token"/>
                                                            </div>
                                                            <div>
                                                                <label for="whatsapp_sender">WhatsApp Phone</label>
                                                                <input id="whatsapp_sender" type="text" placeholder="WhatsApp Send Number" class="form-input" v-model="companyData.settings.whatsapp_sender"/>
                                                            </div>
                                                            <div>
                                                                <label for="whatsapp_message">Message</label>
                                                                <textarea rows="3" wrap="soft" class="form-textarea" x-model="Message" id="whatsapp_message" v-model="companyData.settings.whatsapp_message"></textarea>
                                                            </div>
                                                            <div>
                                                                <label for="whatsapp_template">WhatsApp Template</label>
                                                                <input id="whatsapp_template" type="text" placeholder="WhatsApp Template" class="form-input" v-model="companyData.settings.whatsapp_template"/>
                                                            </div>
                                                            <div>
                                                                <label for="whatsapp_version">WhatsApp API
                                                                    Version</label>
                                                                <input id="whatsapp_version" type="text" v-model="companyData.settings.whatsapp_version"
                                                                    placeholder="WhatsApp API Version" class="form-input"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </vue-collapsible>
                                            </div>

                                        </div>
                                    </div>


                                </div>
                            </div>
                        </TabPanel>
                        <div class="flex flex-wrap justify-end gap-2 mt-5">
                            <button type="submit" class="btn btn-primary" :disabled="loading">Save</button>
                        </div>
                    </form>
                    </TabPanels>
            </TabGroup>
        </div>
    </div>
</template>
<script lang="ts" setup>

    import { ref, reactive, onMounted } from 'vue';
    import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue';

    import { useI18n } from 'vue-i18n';
    import { useMeta } from '@/composables/use-meta';
    import axios from 'axios';
    import VueCollapsible from 'vue-height-collapsible/vue3';
    import FileUploadWithPreview from 'file-upload-with-preview';
    import { useRouter } from 'vue-router';
    import Swal from 'sweetalert2';

    const router = useRouter();

    const accordians: any = ref();

    useMeta({ title: 'Company' });

    const loading = ref(false);

    const companyData = reactive(
        {
            name: null,
            identification: null,
            email: null,
            address: null,
            phone: null,
            logo: null,
            web: null,
            settings: {
                user_tracking: null,
                password_tracking: null,
                user_api_hash: null,
                email_host: null,
                email_port: null,
                email_username: null,
                email_password: null,
                email_encryption: null,
                email_from_address: null,
                email_from_name: null,
                email_subject: null,
                email_message: null,
                whatsapp_token: null,
                whatsapp_sender: null,
                whatsapp_message: null,
                whatsapp_template: null,
                whatsapp_version: "v16.0"
            }
        }
    );
    // const RUTA_API = import.meta.env.VUE_APP_RUTA_API;
    // console.log('Ruta api'+RUTA_API);

    const createCompany = async () => {
        loading.value = true;

        const jsonData = JSON.stringify(companyData);
        try {
            const userKey = "cece83ce-909f-45be-8a60-4641c0bf3980";
            const response = await axios.post(`https://apps.ejesatelital.com/api/sass/v1/companies`,
            jsonData, {
                headers: {
                    'Authorization': `Bearer ${userKey}`,
                    'Content-Type': 'application/json',
                }
            });

            loading.value = false;
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Create...',
                padding: '2em',
                customClass: 'sweet-alerts',
            }).then(() => {
                router.push('/companies');
            });
        } catch (error) {
            console.error(error.response)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error updating: ' + error.response,
                padding: '2em',
                customClass: 'sweet-alerts',
            });
            loading.value = false;
        }
    };



</script>
